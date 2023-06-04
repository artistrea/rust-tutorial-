use std::{fs, error::Error, env};

pub fn run(config: Config) -> Result<(), Box<dyn Error>> {
    // println!("Searching for: {}", config.query);
    // println!(" In file: {}", config.file_path);

    let file_contents = fs::read_to_string(&config.file_path)?;

    let results = if config.ignore_case {
            case_insensitive_search(&config.query, &file_contents)
        } else {
            search(&config.query, &file_contents)
        };

    // println!("  Found {} results:", results.len());

    let results = format_results(results, &config);
    for result in results {
        println!("{result}");
    }

    Ok(())
}

pub struct Config {
    query: String,
    file_path: String,
    ignore_case: bool,
}

impl Config {
    pub fn build(args: &Vec<String>) -> Result<Config, &'static str> {
        if args.len() < 3 {
            return Err("Not enough arguments");
        }

        let query = args[1].clone();
        let file_path = args[2].clone();
        let ignore_case = env::var("IGNORE_CASE").is_ok();

        return Ok(Config {
            query,
            file_path,
            ignore_case
        });
    }
}

fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    let mut results: Vec<&str> = Vec::new();
    for line in  contents.lines() {
        if line.contains(query) {
            results.push(line);
        }
    }

    return results;
}

fn case_insensitive_search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    let mut results: Vec<&str> = Vec::new();
    let query = query.to_lowercase();
    
    for line in  contents.lines() {
        if line.to_lowercase().contains(&query) {
            results.push(line);
        }
    }

    return results;
}

// TODO: Currently not working properly for IGNORE_CASE=1
fn format_results(results: Vec<&str>, config: &Config) -> Vec<String> {
    const BEGIN_RED: &str = "\u{001b}[31;1m";
    const RESET_CLR: &str = "\u{001b}[0m";
        
    let mut updated_results: Vec<String> = Vec::new();
    
    let lc_query = config.query.to_lowercase();
    let query = if config.ignore_case {
        &lc_query
    } else {
        &config.query
    };

    for line in results {
        let mut updated_line = String::new();
        let parts: Vec<&str> = line.split(query).collect();
        updated_line += parts[0];

        for i  in 1..parts.len() {
            updated_line += BEGIN_RED;
            updated_line += query;
            updated_line += RESET_CLR;
            updated_line += parts[i];
            
        }

        updated_results.push(updated_line);
    }

    return updated_results;
}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn case_sensitive() {
        let query = "cow";
        let contents = "\
Rust is definetly a language.
What does it mean? Well, cows wouldn't understand it, but...
well...
Who asked? The CowBoy?";

        assert_eq!(vec!["What does it mean? Well, cows wouldn't understand it, but..."], search(query, contents));
    }

    #[test]
    fn case_insensitive() {
        let query = "CoW";
        let contents = "\
Rust is definetly a language.
What does it mean? Well, cows wouldn't understand it, but...
well...
Who asked? The CowBoy?";

        assert_eq!(
            vec!["What does it mean? Well, cows wouldn't understand it, but...", "Who asked? The CowBoy?"],
            case_insensitive_search(query, contents)
        );
    }
}


