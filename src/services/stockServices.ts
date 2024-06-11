import { axiosInstance } from "../utills/axios";

export const insertDataIntoStocks = async (user_id:string,stock_name:string,stock_symbol:string,buying_price:string,no_of_shares:string) => {
  try {
    const data = { user_id,stock_name, stock_symbol, buying_price, no_of_shares };
    let result = await axiosInstance.post('/shares',data);
    
    return result;
  } catch (error) {
    console.log("ERROR IN GETTING QUESTIONS", error);
  }
};

export const buyStock = async (userId:string,stock_name:string,stock_symbol:string,quantity:string,current_price:string) => {
  try {
    const data = { userId, stock_symbol, quantity,current_price,stock_name};
    
    let result = await axiosInstance.post('/buy',data);
    console.log(result,'testnnfsjdfsdlfsdlflsdfsdf');
    
    
    return result;
  } catch (error) {
    console.log("ERROR IN GETTING QUESTIONS", error);
  }
};

export const sellStock = async (userId:string,stock_symbol:string,quantity:string) => {
  try {
    const data = { userId, stock_symbol, quantity};
    
    let result = await axiosInstance.post('/sell',data);    
    
    return result;
  } catch (error) {
    console.log("ERROR IN GETTING QUESTIONS", error);
  }
};

export const getPortfolioData = async (userId:string) => {
  try {
    let result = await axiosInstance.get(`/portfolio?userId=${userId}`);
    
    return result;
  } catch (error) {
    console.log("ERROR IN GETTING QUESTIONS", error);
  }
};

export const getStockDetailsByStockSymbol = async (stock_symbol:string,userId:string) => {
  try {
    let result = await axiosInstance.get(`/shares?stock_symbol=${stock_symbol}&user_id=${userId}`);
    
    return result;
  } catch (error) {
    console.log("ERROR IN GETTING QUESTIONS", error);
  }
};

export const getStockDetailsByStockSymbolAndUserId = async (stock_symbol:string,userId:string) => {
  try {
    let result = await axiosInstance.get(`/portfolio/stock-data?stock_symbol=${stock_symbol}&user_id=${userId}`);
    
    return result;
  } catch (error) {
    console.log("ERROR IN GETTING QUESTIONS", error);
  }
};

export const getAmountDetailsByUserId = async (userId:string) => {
  try {
    let result = await axiosInstance.get(`/amount?user_id=${userId}`);
    
    return result;
  } catch (error) {
    console.log("ERROR IN GETTING QUESTIONS", error);
  }
};

export const getTransactionsDataByUserId=async(userId:string)=>{
  try{
    let result=await axiosInstance.get(`/transactions?userId=${userId}`)
    
    return result
  }catch(error){
    console.log(error);
    
  }
}

export const updateAmountAfterSelling = async (user_id:string,amount:any) => {
  try {
    const data = { user_id,amount };
    let result = await axiosInstance.post(`/amount/update`,data);
    
    return result;
  } catch (error) {
    console.log("ERROR IN GETTING QUESTIONS", error);
  }
};

export const updateAmountAfterBuying = async (user_id:string,amount:any) => {
  try {
    const data = { user_id,amount };
    let result = await axiosInstance.post(`/amount/update-amount-after-buying`,data);
    
    return result;
  } catch (error) {
    console.log("ERROR IN GETTING QUESTIONS", error);
  }
};

export const updateSharesAfterSeling = async (user_id:string,stock_symbol:any,selling_price:any,no_of_shares_selled:any) => {
  try {
    const data = { user_id,stock_symbol, selling_price,no_of_shares_selled};
    let result = await axiosInstance.post(`/shares/update-shares-after-selling`,data);
    return result;
  } catch (error) {
    console.log("ERROR IN GETTING QUESTIONS", error);
  }
};

export const makeFavouriteStock = async (user_id:string,stock_symbol:any,stock_name:any) => {
  try {
    const data = { user_id,stock_symbol, stock_name};
    let result = await axiosInstance.post(`/watchlist`,data);
    
    return result;
  } catch (error) {
    console.log("ERROR IN GETTING QUESTIONS", error);
  }
};

export const getAllFavouriteStocks = async (user_id:string) => {
  try {
    let result = await axiosInstance.get(`/watchlist?user_id=${user_id}`);
    return result;
  } catch (error) {
    console.log("ERROR IN GETTING QUESTIONS", error);
  }
};

export const postAmount = async (user_id:string,total_amount:any) => {
  try {
    const data = { user_id,total_amount};
    let result = await axiosInstance.post(`/amount`,data);
    return result;
  } catch (error) {
    console.log("ERROR IN GETTING QUESTIONS", error);
  }
};