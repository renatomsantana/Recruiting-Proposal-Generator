function myFunction() {
  try{
    var ss = SpreadsheetApp.openById('1xWkWJYu019g8x-UNYfqaAUrIbNlwcNdTL17w_1qxXBY'); //spreadsheet form "Form Recruiting Proposal"
    var sRespostas = ss.getSheets()[0];
    var ultFila = sRespostas.getLastRow();
   
    var ssBDtxt = SpreadsheetApp.openById('1jfvxI3_IL-AgylBtn7Erzts6mOJyyE0FkR1glODas5k'); // spreadsheet textos base propuestas
    var bdTxt = ssBDtxt.getSheetByName('Recruiting.v2');

    //spreadsheet Planilha de Controle Comercial
    var pCC = SpreadsheetApp.openById('13TmYShTDWlY5yQyPfge9GkqBqTYjIjlJYeNmGafOJwk').getSheetByName('Propostas');
    var ufPcc;

    var modelo, buFolder, buEmail;
    var colLang;

    //valores por default
    var proposalTitleA = proposalTitleB = proposalTitleC = "";
    var propTitleShowA = propTitleShowB = propTitleShowC;
    var proposalSubtitleA = proposalSubtitleB = proposalSubtitleC = "";
    var flatFeeMonth = flatFeeMonthB = flatFeeMonthC = 0;
    var flatFeePosition = flatFeePositionB = flatFeePositionC = 0;
    var flatFeeMonthText, flatFeeMonthBText, flatFeeMonthCText;
    var positionSalaryAText, positionSalaryBText, positionSalaryCText;
    var flatFeePositionText, flatFeePositionBText, flatFeePositionCText;
    var covered = coveredB = coveredC = 0;
    var fee = feeB = feeC = 16;
    var retainerFee = retainerFeeB = retainerFeeC = 30;
    var intermediateFee = intermediateFeeB = intermediateFeeC = 30;
    var completionFee = completionFeeB = completionFeeC = 40; //porcentaje
    var cancellationFeePrev = cancellationFeePrevB = cancellationFeePrevC = 50; //porcentaje
    var cancellationFeeAfter = cancellationFeeAfterB = cancellationFeeAfterC = 100; //porcentaje
    var scalability1 = scalability1B = scalability1C = 7;
    var scalabilityDiscount1 = scalabilityDiscount1B = scalabilityDiscount1C = 10; // resta un % de descuento
    var scalability2 = scalability2B = scalability2C = 15;
    var scalabilityDiscount2 = scalabilityDiscount2B = scalabilityDiscount2C = 15; // resta un % de descuento
    var dueDays = dueDaysB = dueDaysC = 15;
    var timingResponse = timingResponseB = timingResponseC = 24;
    var timingExecute = timingExecuteB = timingExecuteC = 48;
    var exclusivityDays = exclusivityDaysB = exclusivityDaysC = 21;
    var buCode, proposalCode;
    var dbFolder = "19JlJBfL7A1BeiVXk-Xbb2hfU_HJ1CGJ-"; // en esta carpeta se almacenan las propuestas generadas
    var referralFeeA = referralFeeB = referralFeeC = 0;
    var alertDefault = 0;
    var positionSalaryA = positionSalaryB = positionSalaryC = 0;
    var warrantyDays = 0;
    var contractType, feeDec, calcResultA, calcResultB, calcResultC, calcResultImpA, calcResultImpB, calcResultImpC, calcResultText, calcResultImpText;
    var balaPrata, comercialName, typeSale, typeProposal, segment, originContact, modalityA, potentialA, modalityB, potentialB, modalityC, potentialC;

    Logger.log(ultFila);
    var fila = ultFila;

