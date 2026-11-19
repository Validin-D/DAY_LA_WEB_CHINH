
const SignupMessage = document.getElementById("SignupMessage");
const LoginMessage = document.getElementById("LoginMessage");

const NameMessage = document.getElementById("NameMessage");
const EmailMessage = document.getElementById("EmailMessage");
const AuthStatus = document.getElementById("AuthStatus");

const supabaseUrl = "https://rsndakviombsnwebuegy.supabase.co";
const supabaseAnonKey = "sb_publishable_jLDAR7Kpb6W65lgmvpVSMA_9shoqFxk";

const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseAnonKey
);

// Đăng ký tài khoản

const submitButton = document.getElementById("submitIn4");

submitButton.addEventListener("click", async (e) => {
    e.preventDefault();

    SignupMessage.textContent = "";

    const Subname = document.getElementById("username").value.trim();
    const Subemail = document.getElementById("email").value.trim();
    const Subpassword = document.getElementById("password").value;
    const Subrepassword = document.getElementById("repassword").value;

    if (
        Subname === "" ||
        Subemail === "" ||
        Subpassword === "" ||
        Subrepassword === ""
    ) {
        SignupMessage.textContent = "Vui lòng nhập đầy đủ thông tin";
        return;
    }

    if (Subrepassword !== Subpassword) {
        SignupMessage.textContent = "Mật khẩu nhập lại không khớp!";
        return;
    }

    const { data, error } = await supabaseClient.auth.signUp({
        email: Subemail,
        password: Subpassword,
        options: {
            data: {
                name: Subname
            }
        }
    });

    if (error) {
        SignupMessage.textContent = "Đăng ký thất bại: " + error.message;
        return;
    }

    SignupMessage.textContent = "Đăng ký thành công!";
    window.location.href = "index.html";
});


// Đăng nhập

const Loginbutt = document.getElementById("Loginbutt");

Loginbutt.addEventListener("click", async (e) => {
    e.preventDefault();

    LoginMessage.textContent = "";

    const { data: currentData, error: sessionError } =
        await supabaseClient.auth.getSession();

    if (sessionError) {
        LoginMessage.textContent = "Không thể kiểm tra trạng thái đăng nhập";
        return;
    }

    if (currentData.session) {
        LoginMessage.textContent = "Tài khoản được đăng nhập thành công";
        return;
    }

    const LoginEmail = document.getElementById("LoginEmail").value.trim();
    const LoginPassword = document.getElementById("LoginPassword").value;

    if (LoginEmail === "" || LoginPassword === "") {
        LoginMessage.textContent = "Vui lòng nhập đầy đủ thông tin";
        return;
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: LoginEmail,
        password: LoginPassword
    });

    if (error) {
        LoginMessage.textContent = "Đăng nhập thất bại: " + error.message;
        return;
    }

    LoginMessage.textContent = "Đăng nhập thành công!";
    window.location.href = "index.html";
});


// Lấy thông tin người dùng

async function getUser() {
    const { data, error } = await supabaseClient.auth.getUser();

    if (error) {
        return null;
    }

    return data.user;
}


// Cập nhật giao diện

function updateUI(session) {
    if (session) {
        const user = session.user;

        AuthStatus.textContent = "Trạng thái: đang đăng nhập";
        NameMessage.textContent = user.user_metadata?.name || "Chưa có tên";
        EmailMessage.textContent = user.email || "Chưa có email";
    } else {
        AuthStatus.textContent = "Trạng thái: chưa đăng nhập";
        NameMessage.textContent = "Chưa có thông tin";
        EmailMessage.textContent = "Chưa có thông tin";
    }
}


// Kiểm tra trạng thái đăng nhập

async function getSession() {
    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
        AuthStatus.textContent = "Không thể kiểm tra trạng thái đăng nhập";
        return;
    }

    updateUI(data.session);
}


// Theo dõi trạng thái đăng nhập

supabaseClient.auth.onAuthStateChange((event, session) => {
    updateUI(session);
});


getSession();
