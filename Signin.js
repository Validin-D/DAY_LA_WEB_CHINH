const LoginMessage = document.getElementById("LoginMessage")

const supabaseUrl = "https://rsndakviombsnwebuegy.supabase.co"
const supabaseAnonKey = "sb_publishable_jLDAR7Kpb6W65lgmvpVSMA_9shoqFxk"
// Truy cập trực tiếp qua hàm global do CDN cung cấp
 const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseAnonKey); 
// Đăng ký tài khoản cho người dùng

// Phần đăng nhập
const Loginbutt = document.getElementById("Loginbutt")
Loginbutt.addEventListener("click", async (e)=>{
  e.preventDefault();

 const { data: currentData } = await supabaseClient.auth.getSession();
 if (currentData.session) {
  alert("Tài khoản được đăng nhập thành công")
  return;
 }
 
 const LoginEmail = document.getElementById("LoginEmail").value.trim();
 const LoginPassword = document.getElementById("LoginPassword").value;

 if (LoginEmail === "" || LoginPassword === "") {
  alert("Vui lòng nhập đầy đủ thông tin")
  return;
 }
 
 const { data, error } = await supabaseClient.auth.signInWithPassword ({
  email : LoginEmail,
  password : LoginPassword
 });
 if (error) {
  alert("Đăng nhập thất bại: " + error.message)
  return;
 }
 alert("Đăng nhập thành công!")
 window.location.href="index.html";
 
}); 

                           
async function getUser() {
 const { data, error } = await supabaseClient.auth.getUser();
 if (error) {
  return null;
  }
 return data.user;
}
//-------UI------
function updateUI(session) {
 if (session) {
  const user = session.user;
 }
 else {
 }
}
//-----check----
async function getSession() {
 const { data, error } = await supabaseClient.auth.getSession();
 if (error) {
  alert("Không thể kiểm tra trạng thái đăng nhập")
  return;
 }
 updateUI(data.session);
}

//-----theo dõi trạng thái
supabaseClient.auth.onAuthStateChange((event, session) => {
 updateUI(session);
});


getSession()
