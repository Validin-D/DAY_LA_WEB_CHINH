const supabaseUrl = "https://rsndakviombsnwebuegy.supabase.co"
const supabaseAnonKey = "sb_publishable_jLDAR7Kpb6W65lgmvpVSMA_9shoqFxk"
const supabaseClient = window.supabase.createClient(
  supabaseUrl,
  supabaseAnonKey
)
const LogoutMessage = document.getElementById("LogoutMessage")
const MenuUserName = document.getElementById("MenuUserName")
//-------UI------
function updateUI(session) {
 if (session) {
  const user = session.user;
  MenuUserName.textContent= user.user_metadata?.name || "Chưa có tên";
 }
 else {
  MenuUserName.textContent= "Chưa có tên";
 }
}
//-----check----
async function getSession() {
 const { data, error } = await supabaseClient.auth.getSession();
 if (error) {
  MenuUserName.textContent ="Không thể kiểm tra"
  return;
 }
 updateUI(data.session);
}

//----Phần đăng xuất
const textLogOut = document.getElementById("textLogOut");

textLogOut.addEventListener("click", async () => {
 LogoutMessage.textContent ="";

 const { data } = await supabaseClient.auth.getSession();
 if (!data.session) {
  LogoutMessage.textContent = "Bạn hiện chưa đăng nhập";
  return;
 }
 
 const { error } = await supabaseClient.auth.signOut();
  if (error) {
   LogoutMessage.textContent="Đăng xuất thất bại: " + error.message;
   return;
  }
 LogoutMessage.textContent="Đăng xuất thành công";
})
//-----theo dõi trạng thái
supabaseClient.auth.onAuthStateChange((event, session) => {
 updateUI(session);
});
getSession()


/*--------------Phần hiển thị thêm tính năng Menu -----------*/
    /* Nút mở menu */
document.getElementById("imageMenu").addEventListener("click", function () {
    document.querySelector(".menuBox").classList.remove("hidden");
});
    /* Nút đóng menu */
document.getElementById("menuClose").addEventListener("click", function () {
    document.querySelector(".menuBox").classList.add("hidden");
});
