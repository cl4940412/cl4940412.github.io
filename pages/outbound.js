export async function initOutbound() {
  Alpine.data('outboundPage', () => ({ 
    async init() {
      console.log('出庫管理 頁面初始化');
    }
  }));
}
