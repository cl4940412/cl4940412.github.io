export async function initInventory() {
  Alpine.data('inventoryPage', () => ({ 
    async init() {
      console.log('庫存查詢 頁面初始化');
    }
  }));
}
