// Get elements
const openPopupBtn = document.getElementById("open-popup");
const popup = document.getElementById("popup");
const closePopupBtn = document.querySelector(".close-popup");

// Open Popup
openPopupBtn.addEventListener("click", () => {
  popup.style.display = "flex";
});

// Close Popup
closePopupBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

// Close Popup when clicking outside
popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});



// Lấy tất cả các thẻ img trong popup
const imgSections = document.querySelectorAll('img');
let selectedImageText = ''; // Biến lưu trữ giá trị h3 của img đã chọn

// Bắt sự kiện khi click vào bất kỳ thẻ img nào
imgSections.forEach(img => {
    img.addEventListener('click', function() {
        // Gỡ bỏ class 'selected' khỏi tất cả các thẻ img
        imgSections.forEach(img => img.parentElement.classList.remove('selected'));

        // Thêm class 'selected' cho thẻ img đang được chọn
        this.parentElement.classList.add('selected');
        console.log(this);
        
        // Lấy giá trị của thẻ h3 tương ứng
        selectedImageText = this.parentElement.querySelector('h3').textContent;
    });
});

// Lấy thời gian đã chọn và xử lý khi nhấn nút xác nhận
document.getElementById('confirm-time').addEventListener('click', function() {
    // Lấy thời gian đã chọn từ phần chọn thời gian
    const selectedTime = document.querySelector('#time').value;
    const selectedDate = document.querySelector('#date').value;

    // Kiểm tra xem đã chọn ảnh và thời gian chưa
    if (selectedImageText && selectedTime && selectedDate) {

        // Cập nhật nội dung cho Popup Cảm ơn
        document.getElementById('selected-content').textContent = `Bạn đã chọn: ${selectedImageText}`;
        document.getElementById('selected-time').textContent = `Thời gian đã chọn: ${selectedTime} ngày ${selectedDate}`;
        
        // Hiển thị popup cảm ơn
        thankYouPopup.style.display = 'flex';

        // Gửi email
        sendEmail(selectedImageText, selectedTime, selectedDate);

    } else {
        alert('Vui lòng chọn cả địa điểm và thời gian!');
    }
});

const thankYouPopup = document.getElementById('thank-you-popup');
const closeThankYouPopupBtn = thankYouPopup.querySelector('.close-popup');

// Popup thông báo cảm ơn khi xác nhận
document.getElementById('confirm-time').addEventListener('click', function() {
    const selectedTime = document.querySelector('#time-input').value;
    const selectedImageText = document.querySelector('.section.selected h3') ? document.querySelector('.section.selected h3').textContent : '';
    
    if (selectedImageText && selectedTime) {
        // Cập nhật nội dung cho Popup Cảm ơn
        document.getElementById('selected-content').textContent = `Bạn đã chọn: ${selectedImageText}`;
        document.getElementById('selected-time').textContent = `Thời gian đã chọn: ${selectedTime}`;
        
        // Hiển thị popup cảm ơn
        thankYouPopup.style.display = 'flex';
    } else {
        alert('Vui lòng chọn cả hình ảnh và thời gian!');
    }
});

// Đóng popup cảm ơn
closeThankYouPopupBtn.addEventListener('click', () => {
    thankYouPopup.style.display = 'none';
});

// Đóng popup khi click ngoài
thankYouPopup.addEventListener('click', (e) => {
    if (e.target === thankYouPopup) {
        thankYouPopup.style.display = 'none';
    }
});


function convertDateFormat(date) {
  let dateObject = new Date(date);
  let day = ("0" + dateObject.getDate()).slice(-2);
  let month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
  let year = dateObject.getFullYear();

  return `${day}/${month}/${year}`;
}


function sendEmail(selectedImageText, selectedTime, selectedDate) {
  const templateParams = {
      to_email: "@gmail.com", // Thay bằng địa chỉ email của bạn
      subject: `Lựa chọn của bạn: ${selectedImageText}`,
      message: `${selectedImageText} vào lúc ${selectedTime} ngày ${selectedDate}`,
  };

  // Gửi email thông qua EmailJS
  emailjs.send('service_hatpgem', 'template_389lgao', templateParams)
      .then(function(response) {
          console.log('Email gửi thành công', response);
      }, function(error) {
          console.error('Có lỗi xảy ra khi gửi email', error);
      });
}

window.onload = function() {
  var audio = document.getElementById("background-music");
  audio.volume = 0.05; // Chỉnh âm lượng xuống 70%
};
