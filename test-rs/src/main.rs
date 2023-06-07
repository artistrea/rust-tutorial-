use std::io;

fn main() {
    let mut line = String::new();

    let mut  num = String::new();
    let num = match io::stdin().read_line(&mut num).expect("errado") {
        Err(_) => panic!("erro lendo int"),
        Ok(v) => v
    };

    println!("{num}");

    io::stdin().read_line(&mut line).expect("Deu merda");

    let numbers: Vec<i32> = line
        .split_whitespace()
        .map(|x| x.parse::<i32>().expect("deu caca"))
        .collect();

    let squares: Vec<i32> = numbers.into_iter().map(|x| x * x).collect();

    println!("{:?}", squares);
}
