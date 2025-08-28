export async function initAccount() {
  Alpine.data('accountPage', () => ({ 
    async init() {
      console.log('帳號管理 頁面初始化');
    }
  }));
}
