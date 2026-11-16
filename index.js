const supabaseUrl = "https://rsndakviombsnwebuegy.supabase.co"
const supabaseAnonKey = "sb_publishable_jLDAR7Kpb6W65lgmvpVSMA_9shoqFxk"
const supabaseClient = window.supabase.createClient(
  supabaseUrl,
  supabaseAnonKey
)

//-----check----
async function getSession() {
 const { data, error } = await supabaseClient.auth.getSession();
 if (error) {
  AuthStatus.textContent ="Không thể kiểm tra trạng thái đăng nhập"
  return;
 }
 updateUI(data.session);
}

//----Phần đăng xuất
const Logoutbutt = document.getElementById("Logoutbutt")

Logoutbutt.addEventListener("click", async () => {
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
