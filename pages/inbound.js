import { dbPromise } from '../app.js';

export async function initInbound() {
  const db = await dbPromise;

  Alpine.data('inboundScanner', () => ({
    orderId: '',
    serialInput: '',
    scannedList: [],
    db,

    async init() {
	  console.log(this);
	  if(new Date().getSeconds()%2 == 0){
		  document.getElementById("test1").value=0;
	  }else{
		  document.getElementById("test1").value=1;
	  }
	  
      this.generateOrderId();
      await this.loadFromDB();
    },

    generateOrderId() {
      const now = new Date();
      const ymdhms = now.toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
      this.orderId = `IN${ymdhms}`;
    },

    async addSerial() {
      const serial = this.serialInput.trim();
      if (serial && !this.scannedList.includes(serial)) {
        this.scannedList.push(serial);
        this.serialInput = '';
        await this.saveToDB();
      }
    },

    async saveToDB() {
      const data = {
        orderId: this.orderId,
        scannedList: JSON.parse(JSON.stringify(this.scannedList))
      };
	  console.log(data);
	  console.log(this.scannedList);
      await this.db.put('scans', data, 'current');
    },

    async loadFromDB() {
      const saved = await this.db.get('scans', 'current');
      if (saved) {
        this.orderId = saved.orderId;
        this.scannedList = saved.scannedList || [];
      }
    },

    async upload() {
      if (!this.scannedList.length) {
        alert('請先掃描至少一筆流水號');
        return;
      }

      const payload = {
        orderId: this.orderId,
        serialNumbers: this.scannedList
      };

      try {
        const res = await fetch('/api/inbound/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error(await res.text());

        alert('上傳成功！');
        this.scannedList = [];
        this.generateOrderId();
        await this.saveToDB();
      } catch (e) {
        alert(`上傳失敗：${e.message}`);
      }
    }
  }));

  //Alpine.start();
}
