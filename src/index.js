
const phase1DueID = "#phase1";
const dueDateID = "#dueDate";
const phase1DueDate = new Date('February 16, 2022 12:00:00');
const finalDueDate = new Date('February 23, 2022 12:00:00');
const day = 1000 * 3600 * 24;
const hour = day / 24;
const minute = hour / 60;
const numDaysInProject = 14;

let addDueDate = (currentDate) => {
    const phase1TimeLeft = phase1DueDate - currentDate;

    //Array format: [days, hours]
    const phase1DueArr = [Math.floor(phase1TimeLeft / day), Math.floor(24*((phase1TimeLeft / day) - Math.floor(phase1TimeLeft / day)))];


    const finalTimeLeft = finalDueDate - currentDate;
    const finalDueArr = [Math.floor(finalTimeLeft / day), Math.floor(24*((finalTimeLeft / day) - Math.floor(finalTimeLeft / day)))];
    


    if (phase1TimeLeft > 0) {
        $(phase1DueID).html("MetroSim Phase 1 is due in <span class='underline'>" + phase1DueArr[0] + " days and " + phase1DueArr[1] + " hours! </span>");
        $(dueDateID).remove();
    }

    else if (finalTimeLeft > 0) {
        $(dueDateID).html("MetroSim is due in <span class='underline'>" + finalDueArr[0] + " days and " + finalDueArr[1] + " hours!</span>");
        $(phase1DueID).remove();
    }
    

    

    console.log(phase1DueArr);
    console.log(finalDueArr);
}


let highlightCurrentDate = (currentDate) => {
    let currentDayNum = numDaysInProject - Math.floor((finalDueDate - currentDate)/day);

    const beforeNoonCheck = new Date (Date.now());

    if (beforeNoonCheck.getHours() < 12) {
        currentDayNum++;
    }
    
    if (currentDayNum > numDaysInProject) {
        return;
    }
    
    console.log(currentDayNum);
    $("#day" + currentDayNum).addClass('text-green-600 underline');

    for (let i = currentDayNum - 1; i > 0; i--) {
        $("#day" + i).addClass("line-through");
    }
}

let createButtonLink = (buttonId, linkAddress) => {
    $(buttonId).click (() => {
        window.open(linkAddress, '_blank');
    });
}


jQuery(() => {
    console.log("hello world");
    const todaysDate = Date.now();
    addDueDate(todaysDate);
    highlightCurrentDate(todaysDate);

    const buttonLinks = [['#specLink', 'https://www.cs.tufts.edu/comp/15/schedule/specs/proj1_MetroSim.pdf'], ['#styleCheck', 'https://gabrielsessions.github.io/CS15-Style-Check/src/index.html'], ['#flowchartButton', './flowchart.html'],['#classesButton', './classDiagrams.html']];

    for (let i = 0; i < buttonLinks.length; i++) {
        createButtonLink(buttonLinks[i][0], buttonLinks[i][1]);
    }
    
});