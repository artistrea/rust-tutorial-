use std::{
    fs,
    io::{prelude::*, BufReader},
    net::{TcpListener, TcpStream}, thread, time::Duration
};

use hello_net::ThreadPool;

fn main() {
    let listener = TcpListener::bind("127.0.0.1:3000").unwrap();
    let pool = ThreadPool::new(4);


    for stream in listener.incoming() {
        let stream = stream.unwrap();

        pool.execute(|| {
            handle_connection(stream);
        });
    }

    println!("Hello, world!");
}

fn handle_connection(mut stream: TcpStream) {
    let buf_reader = BufReader::new(&mut stream);
    let http_request: Vec<_> = buf_reader
        .lines()
        .map(|result| result.unwrap())
        .take_while(|line| !line.is_empty())
        .collect();
    let request_line = &http_request[0];

    let response = match &request_line[..]  {
        "GET / HTTP/1.1" => 
            Response::new("HTTP/1.1 200 OK", fs::read_to_string("hello.html").unwrap()),
        "GET /sleep HTTP/1.1" => {
            thread::sleep(Duration::from_secs(5));
            Response::new("HTTP/1.1 200 OK", fs::read_to_string("hello.html").unwrap())
        },
        _ =>
            Response::new("HTTP/1.1 404 NOT FOUND", fs::read_to_string("404.html").unwrap())
    };
    
    let length = response.contents.len();
    let response = format!("{}\r\nContent-Length: {}\r\n\r\n{}", response.status_line, length, response.contents);
    stream.write_all(response.as_bytes()).unwrap();

    println!("Request: {:#?}", http_request);
}

struct Response<'a> {
    status_line: &'a str,
    contents: String,
}

impl Response<'_> {
    fn new<'a>(
        status_line: &'a str,
        contents: String,
    ) -> Response {
        Response {
            status_line,
            contents,
        }
    }
}
