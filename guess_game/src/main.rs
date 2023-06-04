use std::{io, cmp::Ordering};
use rand::Rng;
fn main() {
    println!("Welcome to the guess game");
    
    let secret_number = rand::thread_rng().gen_range(1..=10);

    loop {
        println!("Guess a number between 0 and 10");

        let mut guess = String::new();

        
        io::stdin()
        .read_line(&mut guess)
        .expect("Erro ao ler input!");
    
        let guess = match guess.trim().parse::<i32>() {
            Ok(v) => v,
            Err(_) => {
                println!("Please input a number (i32)...");
                continue;
            },
        };

        match guess.cmp(&secret_number) {
            Ordering::Greater   => println!("Too big..."),
            Ordering::Equal     => {
                println!("Congratulations!!\nYou won!");
                break;
            },
            Ordering::Less      => println!("Too small..."),
        }
    }


    println!("Hello, world!");
}
