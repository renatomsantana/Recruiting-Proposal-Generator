function myFunction() {
  try{
    var ss = SpreadsheetApp.openById('1xWkWJYu019g8x-UNYfqaAUrIbNlwcNdTL17w_1qxXBY'); //spreadsheet form "Form Recruiting Proposal"
    var sRespostas = ss.getSheets()[0];
    var ultFila = sRespostas.getLastRow();
   
    var ssBDtxt = SpreadsheetApp.openById('1jfvxI3_IL-AgylBtn7Erzts6mOJyyE0FkR1glODas5k'); // spreadsheet textos base das propostas
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
    var completionFee = completionFeeB = completionFeeC = 40; //porcentagem
    var cancellationFeePrev = cancellationFeePrevB = cancellationFeePrevC = 50; //porcentagem
    var cancellationFeeAfter = cancellationFeeAfterB = cancellationFeeAfterC = 100; //porcentagem
    var scalability1 = scalability1B = scalability1C = 7;
    var scalabilityDiscount1 = scalabilityDiscount1B = scalabilityDiscount1C = 10; // resta um % de desconto
    var scalability2 = scalability2B = scalability2C = 15;
    var scalabilityDiscount2 = scalabilityDiscount2B = scalabilityDiscount2C = 15; // resta um % de desconto
    var dueDays = dueDaysB = dueDaysC = 15;
    var timingResponse = timingResponseB = timingResponseC = 24;
    var timingExecute = timingExecuteB = timingExecuteC = 48;
    var exclusivityDays = exclusivityDaysB = exclusivityDaysC = 21;
    var buCode, proposalCode;
    var dbFolder = "19JlJBfL7A1BeiVXk-Xbb2hfU_HJ1CGJ-"; // propostas geradas são armazenadas nesta pasta.

    var referralFeeA = referralFeeB = referralFeeC = 0;
    var alertDefault = 0;
    var positionSalaryA = positionSalaryB = positionSalaryC = 0;
    var warrantyDays = 0;
    var contractType, feeDec, calcResultA, calcResultB, calcResultC, calcResultImpA, calcResultImpB, calcResultImpC, calcResultText, calcResultImpText;
    var balaPrata, comercialName, typeSale, typeProposal, segment, originContact, modalityA, potentialA, modalityB, potentialB, modalityC, potentialC;

    Logger.log(ultFila);
    var fila = ultFila;

    var ssDb = SpreadsheetApp.openById('1Zuyth2djZC2WcDljaZBL_Rms0k2GpAc9wGzgUHsV0so'); // spreadsheet BD propostas geradas
    var rowBd = ssDb.getSheetByName('validation').getRange("N2").getValue();
    var sBd = ssDb.getSheetByName('Recruiting');
    
    //copiar os dados carregados do formulário
    /* 1. Basis Data */
    var time = sRespostas.getRange(fila,1,1,1).getValue();
    var comercialEmail = sRespostas.getRange(fila,2,1,1).getValue();
    var bu = sRespostas.getRange(fila,3,1,1).getValue();
    var lenguage = sRespostas.getRange(fila,4,1,1).getValue();
    var country = sRespostas.getRange(fila,5,1,1).getValue();
    var compFantasyName = sRespostas.getRange(fila,6,1,1).getValue();
    var compWeb = sRespostas.getRange(fila,7,1,1).getValue();
    var compBusinessName = sRespostas.getRange(fila,8,1,1).getValue();
    var compId = sRespostas.getRange(fila,9,1,1).getValue();
    var compAddress = sRespostas.getRange(fila,10,1,1).getValue();
    /* 2. Contact Data */
    var contactPerson = sRespostas.getRange(fila,11,1,1).getValue();
    var contactRole = sRespostas.getRange(fila,12,1,1).getValue();
    var contactEmail = sRespostas.getRange(fila,13,1,1).getValue();
    var contactPhone = sRespostas.getRange(fila,14,1,1).getValue();
    /* 3.a. Fee Data */
    var propTitleShowA = sRespostas.getRange(fila,15,1,1).getValue();
    proposalSubtitleA = sRespostas.getRange(fila,16,1,1).getValue();
    var coin = sRespostas.getRange(fila,17,1,1).getValue();

    if(sRespostas.getRange(fila,18,1,1).getValue().toString() != "" ){
    var flatFeeMonth = sRespostas.getRange(fila,18,1,1).getValue();
    }
    if(sRespostas.getRange(fila,18,1,1).getValue().toString() != "" ){
    var flatFeeMonth = sRespostas.getRange(fila,18,1,1).getValue();
    }
    if(sRespostas.getRange(fila,19,1,1).getValue().toString() != ""){
    var flatFeePosition = sRespostas.getRange(fila,19,1,1).getValue();
    }
    if(sRespostas.getRange(fila,20,1,1).getValue().toString() != ""){
    var covered = sRespostas.getRange(fila,20,1,1).getValue();
    }

    if(sRespostas.getRange(fila,21,1,1).getValue().toString() != ""){
    fee = sRespostas.getRange(fila,21,1,1).getValue();
    }

    if(sRespostas.getRange(fila,22,1,1).getValue().toString() != ""){
    var retainerFee = sRespostas.getRange(fila,22,1,1).getValue();
    }
    if(sRespostas.getRange(fila,23,1,1).getValue().toString() != ""){
    var intermediateFee = sRespostas.getRange(fila,23,1,1).getValue();
    }
    if(sRespostas.getRange(fila,24,1,1).getValue().toString() != ""){
    var completionFee = sRespostas.getRange(fila,24,1,1).getValue();
    }
