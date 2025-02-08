// استرجاع العناصر
const addLectureButton = document.getElementById("addLectureButton");
const lectureInput = document.getElementById("lectureInput");
const lectureTitle = document.getElementById("lectureTitle");
const lectureList = document.getElementById("lectureList");

let lectures = [];  // لحفظ المحاضرات

// وظيفة لإضافة المحاضرة
addLectureButton.addEventListener("click", function() {
    const title = lectureTitle.value;
    const content = lectureInput.value;

    if (title && content) {
        const newLecture = {
            title: title,
            content: content
        };

        lectures.push(newLecture);  // إضافة المحاضرة إلى المصفوفة
        displayLectures();  // تحديث عرض المحاضرات
        lectureTitle.value = '';  // مسح الحقول
        lectureInput.value = '';
    } else {
        alert("الرجاء إدخال العنوان والمحتوى");
    }
});

// وظيفة لعرض المحاضرات
function displayLectures() {
    lectureList.innerHTML = '';  // مسح المحتوى الحالي في القائمة

    lectures.forEach((lecture, index) => {
        const li = document.createElement("li");

        const lectureButton = document.createElement("button");
 lectureButton.textContent = lecture.title;
        lectureButton.addEventListener("click", function() {
            openLecture(index);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "حذف";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", function() {
            deleteLecture(index);
        });

        li.appendChild(lectureButton);
        li.appendChild(deleteButton);

        lectureList.appendChild(li);
    });
}

// وظيفة لفتح المحاضرة للتعديل
function openLecture(index) {
    const lecture = lectures[index];
    lectureTitle.value = lecture.title;
    lectureInput.value = lecture.content;

    addLectureButton.textContent = "تعديل المحاضرة";
    addLectureButton.removeEventListener("click", addLecture);
    addLectureButton.addEventListener("click", function() {
        modifyLecture(index);
    });
}

// وظيفة لتعديل المحاضرة
function modifyLecture(index) {
    lectures[index].title = lectureTitle.value;
    lectures[index].content = lectureInput.value;
    
    addLectureButton.textContent = "إضافة المحاضرة";
    addLectureButton.removeEventListener("click", modifyLecture);
    addLectureButton.addEventListener("click", function() {
        addLecture();
 });

    lectureTitle.value = '';
    lectureInput.value = '';
    displayLectures();
}

// وظيفة لحذف المحاضرة
function deleteLecture(index) {
    lectures.splice(index, 1);  // إزالة المحاضرة من المصفوفة
    displayLectures();
}

// استعراض المحاضرات عند تحميل الصفحة
window.onload = displayLectures;


