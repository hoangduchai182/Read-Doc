window.addEventListener('load', function () {
  const textElement = document.getElementById('text'),
    tableElement = document.getElementById('myTable'),
    btn_list = document.getElementById('btn-list'),
    area_text = document.getElementById('area-text'),
    area_hightline = document.getElementById('area-hightline');

  const btn_yellow = document.getElementById('btn-yellow'),
    btn_blue = document.getElementById('btn-blue'),
    btn_red = document.getElementById('btn-red'),
    btn_green = document.getElementById('btn-green');

  let highlighted = false; // Biến cờ biểu thị xem văn bản có được bôi đen hay không

  btn_list.addEventListener('click', function () {
    if (area_hightline.style.display === 'none') {
      area_hightline.style.display = 'block';
      area_text.classList.add('w-75');
      area_hightline.classList.add('w-25');
    } else {
      area_hightline.style.display = 'none';
      area_text.classList.remove('w-75');
      area_hightline.classList.remove('w-25');
    }
  });

  textElement.addEventListener('mouseup', function (event) {
    const selection = window.getSelection().toString().trim();
    if (selection !== '') {
      const range = window.getSelection().getRangeAt(0);
      const rect = range.getBoundingClientRect();
      tableElement.style.display = 'block';
      tableElement.style.top = rect.top + tableElement.offsetHeight / 2 + 'px';
      tableElement.style.left =
        rect.left + rect.width / 2 - tableElement.offsetWidth / 2 + 'px';
      highlighted = true; // Đặt cờ biểu thị là true khi văn bản được bôi đen

      const paragraph = document.createElement('p'); // Tạo một thẻ p mới
      paragraph.textContent = selection; // Đặt văn bản bôi đen vào thẻ p
      area_hightline.appendChild(paragraph); // Thêm thẻ p vào thẻ div có id 'area-hightline'
    }
  });

  document.addEventListener('mousedown', function (event) {
    // Ẩn bảng chỉ khi văn bản không được bôi đen và không phải là nút "Đổi màu"
    if (
      !highlighted ||
      (!event.target.closest('#btn-yellow') &&
        !event.target.closest('#btn-blue') &&
        !event.target.closest('#btn-red') &&
        !event.target.closest('#btn-green'))
    ) {
      tableElement.style.display = 'none';
    }
    highlighted = false; // Đặt lại cờ biểu thị là false sau khi mousedown
  });

  btn_yellow.addEventListener('click', function () {
    ChangeColor('highlight-yellow');
  });
  btn_blue.addEventListener('click', function () {
    ChangeColor('highlight-blue');
  });

  btn_red.addEventListener('click', function () {
    ChangeColor('highlight-red');
  });

  btn_green.addEventListener('click', function () {
    // Xóa thẻ cũ đi, thêm thẻ mới có thẻ span vào
    ChangeColor('highlight-green');
  });

  function ChangeColor(color) {
    // Xóa thẻ cũ đi, thêm thẻ mới có thẻ span vào
    const selection = window.getSelection();
    if (!selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      const selectedText = range.cloneContents();
      const span = document.createElement('span');
      span.classList.add(color);
      span.appendChild(selectedText);
      range.deleteContents();
      range.insertNode(span);
    }
    console.log('hello');
  }
});
