use actix_web::{get, App, HttpServer, Responder};
use actix_files::NamedFile;
use std::{env};

#[get("/")]
async fn hello() -> impl Responder {
    NamedFile::open("static/index.html")
}

#[get("/js/index.js")]
async fn index_js() -> impl Responder {
    NamedFile::open("static/index.js")
}

#[get("/js/login_done.js")]
async fn login_done_js() -> impl Responder {
    NamedFile::open("static/login_done.js")
}

#[get("/{_:.*}")]
async fn login_done() -> impl Responder {
    NamedFile::open("static/login_done.html")
}


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let args: Vec<String> = env::args().collect();
    let port = args.get(1).unwrap_or(&"8080".to_string()).parse::<u16>().unwrap();
    println!("Starting server on port {}", port);
    HttpServer::new(|| App::new()
                        .service(hello)
                        .service(index_js)
                        .service(login_done_js)
                        .service(login_done)
                    )
        .bind(("127.0.0.1", port))?
        .run()
        .await
}