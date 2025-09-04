export async function initLogin() {
  Alpine.data('loginPage', () => ({ 
    async init() {
      console.log('帳號管理 頁面初始化');
	  async function login(username, password) {
		try {
		  // const res = await fetch('/api/login', {
			// method: 'POST',
			// headers: { 'Content-Type': 'application/json' },
			// body: JSON.stringify({ username, password })
		  // });

		  // if (!res.ok) throw new Error("登入失敗");
		  // const data = await res.json();
		  
		  const data = {username:username,settings:{ boxFormat:"BX-{####}", serialFormat:"SN-{YYYYMM}-{####}", orderFormat:"ORD-{date}-{####}" }};

		  // 1. 保存帳號
		  localStorage.setItem("currentUser", username);

		  // 2. 保存設定檔（建議存 IndexedDB）
		  if (data.settings) {
			//await saveSettingsToIDB(data.settings);
			console.log(data.settings);
		  }
		  
		  document.getElementById("currentUser").innerText = username;

		  // 3. 導回首頁
		  Alpine.store('router').navigate('/home');
		} catch (err) {
		  console.error(err);
		  document.getElementById("loginMsg").textContent = "登入失敗，請檢查帳號或密碼";
		}
	  }

	  // 儲存設定檔到 IndexedDB (透過 idb.js)
	  async function saveSettingsToIDB(settings) {
		return new Promise((resolve, reject) => {
		  const dbRequest = indexedDB.open("PWA_DB", 1);

		  dbRequest.onupgradeneeded = function(e) {
			const db = e.target.result;
			if (!db.objectStoreNames.contains("settings")) {
			  db.createObjectStore("settings", { keyPath: "key" });
			}
		  };

		  dbRequest.onsuccess = function(e) {
			const db = e.target.result;
			const tx = db.transaction("settings", "readwrite");
			const store = tx.objectStore("settings");

			// 假設 settings = { boxFormat:"BX-{####}", serialFormat:"SN-{YYYYMM}-{####}", orderFormat:"ORD-{date}-{####}" }
			for (const key in settings) {
			  store.put({ key, value: settings[key] });
			}

			tx.oncomplete = () => resolve(true);
			tx.onerror = () => reject(tx.error);
		  };

		  dbRequest.onerror = () => reject(dbRequest.error);
		});
	  }

	  // 綁定登入事件
	  document.getElementById("loginForm").addEventListener("submit", function(e) {
		e.preventDefault();
		const username = document.getElementById("username").value.trim();
		const password = document.getElementById("password").value.trim();
		login(username, password);
	  });
	  
    }
  }));
}
