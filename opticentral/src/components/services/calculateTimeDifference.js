/**
 * Calculate the time difference in hours between two given times in "HH:MM" format
 * 
 * @param {string} start - the start time in "HH:MM" format.
 * @param {string} end- the end time in "HH:MM" format.
 * @returns {string|null}- the time difference in hours as a string  limited to 2 decimal place, or null if inputs are invalid.

*/




function calculateTimeDifference(start, end) { 

    if (start && end) {
        
        const [startHours, startMinute] = start.split(":").map(Number);
        const [endHours, endMinutes] = end.split(":").map(Number);

      

        const startDate = new Date();
        startDate.setHours(startHours, startMinute, 0);



        const endDate = new Date();
        endDate.setHours(endHours, endMinutes, 0);

        

        let diffMs = endDate - startDate;

                
        if (diffMs < 0) {
            // If the difference is negative, it means the end time is on the next day            
            diffMs += 24 * 60 * 60 * 1000; // Add 24 hours in milliseconds
        }

     


        const diffHours = diffMs / (1000 * 60 * 60); // Convert milliseconds to hours

       

        const timeDifference = diffHours.toFixed(2); // Limit to 2 decimal places

        return timeDifference



    } else {
       return null
    }

 

}

export {
    calculateTimeDifference
}