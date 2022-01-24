1. Deploy source code ở local PC
Sử dụng: MySql Workbench, Docker, Postman

+ Chạy lệnh sau để build image, run container, khởi động server Nodejs:
    docker compose up --build 

    docker compose down         - để dừng 

+ Sau khi chạy thành công sẽ hiện thông báo : "Server started on port 3000!" => port sẽ hoạt đông ở localhost:3000/
    *nếu xuất hiện lỗi từ DB, vd: ..todo/user already exist..
    -> vào file index.ts, sửa: "synchronize": "true" -> "false"
            
+ Kết nối với MySql Workbench ở port 3307
Chọn Database -> Connect to Database -> Nhập Port : 3307 
    username: root
    password: root1234
Database 'Kyanon' có 2 table: user, todo
#######################################################################

+ Tiến hành test API không qua dữ liệu mẫu. Token hết hạn sau 3h.

    1. SIGN UP
    POST: localhost:3000/auth/sign-up

    Record user có tất cả 4 fields: id, username, password, fullName
    VD: "username": "user1",
        "password": "12345",
        "fullName": "Nguoi dung 1"

    Thành công: "Register is success" 
<!-- ----------------------------------------------------------------------- -->
    2. SIGN IN
    POST: localhost:3000/auth/sign-in

    Nhập username và password vừa tạo
    VD: "username": "user1",
        "password": "12345"

    Thành công: Server trả về thông báo thành công và thông tin của user bao gồm token.
    Thất bại: Do sai username hoặc mật khẩu
<!-- ----------------------------------------------------------------------- -->
    3. ADD TO-DO
    POST: localhost:3000/todo/
    Headers: 
        - 'Content-Type' : 'application/json'
        - 'Authorization': 'điền token được trả về từ API 2'
        VD: 'Authorization' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMmMxNTgwMC1kMWE5LTQ0MDAtYjNhNy02ZWI0ZGJmYzUyOGIiLCJ1c2VybmFtZSI6InVzZXI2IiwiaWF0IjoxNjQyOTU0NTI3LCJleHAiOjE2NDI5NjUzMjd9.gg4bLUTyJOjHoIRGYjfXat9zvHKbwJs8oxCwyUqXI1w'

    Body: định dạng raw JSON
    Record to-do có 8 fields: id, name, desc, userid, deadlineTime, status, dateCreated, dateModified
    VD: "name" : "Task 1", 
        "desc" : "Description of task ..",
        "status": "new",   
        "deadlineTime" : "2022/2/12"   
    
    *Lưu ý: -'dateCreated' và 'dateModified' sẽ được tự đông nhập; 'userid' sẽ assign riêng
            -'status' chỉ nhận 2 giá trị 'new' hoặc 'complete'. Nếu sai server sẽ báo lỗi.
            -'deadlineTime': yyyy/mm/dd

    Thành công: Server trả về thông tin của todo bao gồm: id, name, status, desc, userid, deadlineTime, dateCreated, dateModified.
    Thất bại: Do trùng tên với todo đã có trong DB hoặc sai giá trị status
<!-- ----------------------------------------------------------------------- -->
    4.  Cập nhật to-do
    PATCH: localhost:3000/todo/{id của todo cần cập nhật, VD: 1}
    Set Header như trên

    VD: "name" : "Task 1 update",
        "desc" : "Description for task .",
        "status": "complete",
        "deadlineTime" : "2022/1/29"

    *Lưu ý: nếu todo 1 đã ở trạng thái 'complete' sẽ nhận thông báo 'Cannot update this task because it already complete.'

    Thành công: Server trả về thông tin mới nhất và trạng thái thành công.
    Thất bại: trùng 'name' hoặc todo đã 'complete'
<!-- ----------------------------------------------------------------------- -->
    5. REMOVE TO-DO
    DELETE: localhost:3000/todo/{id của todo cần cập nhật, VD: 1}
    Set Header 

    Thành công: "Deleted successful"
    Thất bại: do không tồn tại id hoặc todo ở trạng thái 'complete'
<!-- ----------------------------------------------------------------------- -->
    6. GET ALL TO-DO
    GET: localhost:3000/todo/
    Set Header như trên

    Thành công: Trả về danh sách các to-do có trong hệ thống
<!-- ----------------------------------------------------------------------- -->
    7. GET-TO-DO-BY-ID
    GET: localhost:3000/todo/1
    Set Header

    Thành công: Trả về thông tin  của 1 to-do
    Thất bại: không tồn tại id
<!-- ----------------------------------------------------------------------- -->
    8. GET-ALL-USER:
    GET: localhost:3000/user/
    Set Header

    Thành công: Trả về danh sách các users có trong hệ thống.
<!-- ----------------------------------------------------------------------- -->
    9. ASSIGN-TO-DO
    POST: localhost:3000/todo/1
    Set Header

    VD: 
        "userIdAssign": "134234cf-b73d-4e9a-a84f-700eefe4f28a"

    Thành công: "Assign succeed"
    Thất bại: khi user được assign trùng với user hiện tại, hoặc user được assign không tồn tại
<!-- ----------------------------------------------------------------------- -->
    10. GET-ALL-TASK-BY-USER
    GET: localhost:3000/todo/user-task/{userid}
    Set Header

    Thành công: Trả về danh sách các task mà user được assign.

