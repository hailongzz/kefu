/**
 * 获取url ?后面的传值
 */
export const getQuery = (key)=>{
    const params = window.location.href.split('?')[1] || ""
    const query = {}
    if(params){
        params.split('&').forEach((item)=>{
            let queryValue = item.split('=')
            query.queryValue[0] = queryValue[1]
        })
    }
    const rst = query[key]
    return rst ? window.decodeURIComponent(query[key]) : ""
}