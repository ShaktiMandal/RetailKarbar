
export const GetCurrentDate = () =>{
           

        let formatedDate;
        let day = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();

        if(day !== undefined && month !== undefined && year !== undefined)
        {
            month = month.toString().length === 1 ? "0" + month : month;
            day = day.toString().length === 1 ? "0" + day : day;

            formatedDate = year + "-" + month + "-" + day
        }

        return formatedDate;
    }