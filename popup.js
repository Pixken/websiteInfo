// 查找是否已添加
const findInfo = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tab = tabs[0];
    console.log(tab.url)
    show(['loading'])
    const res = await fetch(`http://localhost:3000/api/findWebsite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: tab.url })
    })
    const data = await res.json()
    if (data.length) {
      show(['isAdded'])
    } else {
      show(['getInfoBtn'])
    }
  });
}
findInfo()

// 获取信息
document.getElementById('getInfoBtn').addEventListener('click', () => {
  show(['form'])
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tab = tabs[0];
    console.log(tab.url)
    document.getElementById('url').value = tab.url;
    document.getElementById('icon').value = tab.favIconUrl || 'https://via.placeholder.com/16'; // 如果没有找到图标，使用占位图
    document.getElementById('iconImg').setAttribute('src', tab.favIconUrl || 'https://via.placeholder.com/16');
    document.getElementById('title').value = tab.title;
  });
});

// 添加
document.getElementById('addInfo').addEventListener('click', async (e) => {
  e.preventDefault()
  const websiteData = {
    title: document.getElementById('title').value,
    icon: document.getElementById('icon').value,
    url: document.getElementById('url').value,
    label: ['123', '123'],
    desc: document.getElementById('description').value,
    classifyId: '111',
  };
  show(['loading'])
  const res = await fetch('http://localhost:3000/api/website', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(websiteData)
  })
  res.status === 200 ? show(['success', 'close']) : show(['error', 'close'])
});

// 关闭弹窗
document.getElementById('close').addEventListener('click', () => {
  window.close()
});


// 显示隐藏
const allArr = ['form', 'loading', 'isAdded', 'getInfoBtn', 'success', 'error', 'close']
const show = (arr) => {
  allArr.forEach(item => {
    if (arr.includes(item)) {
      document.getElementById(item).classList.remove('hide')
    } else {
      document.getElementById(item).classList.add('hide')
    }
  })
}