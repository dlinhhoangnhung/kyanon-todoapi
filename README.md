Deploy source code ở local PC
Sử dụng: MySql Workbench, Docker, Postman

+ Chạy lệnh sau để build image, run container, khởi động server Nodejs:
    docker compose up --build 

    docker compose down         - để dừng 

+ Sau khi chạy thành công sẽ hiện thông báo : "Server started on port 3000!" => port sẽ hoạt đông ở localhost:3000/
    *nếu xuất hiện lỗi từ DB, vd: ..todo/user already exist..
    -> vào file index.ts, sửa: "synchronize": "true" -> "false"
            
+ Kết nối với MySql Workbench ở 
    host: localhost
    port:  3307
    username: root,
    password: root1234,
    database: kyanon
    
Database 'Kyanon' có 2 table: user, todo

+ Test API: 
- file postman
- file docx chứa screenshot kết quả
#######################################################################

