export async function initReturn() {
  Alpine.data('returnPage', () => ({ 
    async init() {
      console.log('退貨管理 頁面初始化');
    }
  }));
}
