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
    var fee = feeB = feeC = 21;
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

    var ssDb = SpreadsheetApp.openById('1Zuyth2djZC2WcDljaZBL_Rms0k2GpAc9wGzgUHsV0so'); // spreadsheet BD propuestas generadas
    var rowBd = ssDb.getSheetByName('validation').getRange("N2").getValue();
    var sBd = ssDb.getSheetByName('Recruiting');

    //copio os dados carregados pelo formulário

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

    /* 4.a. Disclaimer Data */
    if(sRespostas.getRange(fila,25,1,1).getValue().toString() != ""){
    var cancellationFeePrev = sRespostas.getRange(fila,25,1,1).getValue();
    }
    if(sRespostas.getRange(fila,26,1,1).getValue().toString() != ""){
    var cancellationFeeAfter = sRespostas.getRange(fila,26,1,1).getValue();
    }
    if(sRespostas.getRange(fila,27,1,1).getValue().toString() != ""){
    var scalability1 = sRespostas.getRange(fila,27,1,1).getValue();
    }
    if(sRespostas.getRange(fila,28,1,1).getValue().toString() != ""){
    var scalabilityDiscount1 = sRespostas.getRange(fila,28,1,1).getValue();
    }
    if(sRespostas.getRange(fila,29,1,1).getValue().toString() != ""){
    var scalability2 = sRespostas.getRange(fila,29,1,1).getValue();
    }
    if(sRespostas.getRange(fila,30,1,1).getValue().toString() != ""){
    var scalabilityDiscount2 = sRespostas.getRange(fila,30,1,1).getValue();
    }
    if(sRespostas.getRange(fila,31,1,1).getValue().toString() != ""){
    var dueDays = sRespostas.getRange(fila,31,1,1).getValue();
    }
    if(sRespostas.getRange(fila,32,1,1).getValue().toString() != ""){
    var timingResponse = sRespostas.getRange(fila,32,1,1).getValue();
    }
    if(sRespostas.getRange(fila,33,1,1).getValue().toString() != ""){
    var timingExecute = sRespostas.getRange(fila,33,1,1).getValue();
    }
    if(sRespostas.getRange(fila,34,1,1).getValue().toString() != ""){
    var exclusivityDays = sRespostas.getRange(fila,34,1,1).getValue();
    }
    if(sRespostas.getRange(fila,77,1,1).getValue().toString() != ""){
    var referralFeeA = sRespostas.getRange(fila,77,1,1).getValue();
    }
    if(sRespostas.getRange(fila,80,1,1).getValue().toString() != ""){
    var positionSalaryA = sRespostas.getRange(fila,80,1,1).getValue();
    }
    warrantyDays = sRespostas.getRange(fila,83,1,1).getValue();
    contractType = sRespostas.getRange(fila,84,1,1).getValue();
    balaPrata = sRespostas.getRange(fila,85,1,1).getValue();
    typeSale = sRespostas.getRange(fila,86,1,1).getValue();
    typeProposal = sRespostas.getRange(fila,87,1,1).getValue();
    segment = sRespostas.getRange(fila,88,1,1).getValue();
    originContact = sRespostas.getRange(fila,89,1,1).getValue();
    modalityA = sRespostas.getRange(fila,90,1,1).getValue();
    potentialA = sRespostas.getRange(fila,91,1,1).getValue();
    

    Logger.log("Fee: "+fee);
    Logger.log("Retainer: "+retainerFee);
    Logger.log("Intermediate: "+intermediateFee);
    Logger.log("Completion: "+completionFee);
    Logger.log("Due Days: "+dueDays);

    //comprovar se há mais de um projeto
    var qtyJob = 1;

    if(sRespostas.getRange(fila,35,1,1).getValue() == "Yes")
    {

    /* ++++ repetir aqui 3.B Y 4.B ++++ */
    qtyJob++;
    /* 3.b. Fee Data */
    var propTitleShowB = sRespostas.getRange(fila,36,1,1).getValue();
    proposalSubtitleB = sRespostas.getRange(fila,37,1,1).getValue();
    var coinB = sRespostas.getRange(fila,38,1,1).getValue();
    if(sRespostas.getRange(fila,39,1,1).getValue().toString() != ""){
      var flatFeeMonthB = sRespostas.getRange(fila,39,1,1).getValue();
    }
    if(sRespostas.getRange(fila,40,1,1).getValue().toString() != ""){
      var flatFeePositionB = sRespostas.getRange(fila,40,1,1).getValue();
    }
    if(sRespostas.getRange(fila,41,1,1).getValue().toString() != ""){
      var coveredB = sRespostas.getRange(fila,41,1,1).getValue();
    }

    if(sRespostas.getRange(fila,42,1,1).getValue().toString() != ""){
      feeB = sRespostas.getRange(fila,42,1,1).getValue();
    }

    if(sRespostas.getRange(fila,43,1,1).getValue().toString() != ""){
      var retainerFeeB = sRespostas.getRange(fila,43,1,1).getValue();
    }
    if(sRespostas.getRange(fila,44,1,1).getValue().toString() != ""){
      var intermediateFeeB = sRespostas.getRange(fila,44,1,1).getValue();
    }
    if(sRespostas.getRange(fila,45,1,1).getValue().toString() != ""){
      var completionFeeB = sRespostas.getRange(fila,45,1,1).getValue();
    }

    /* 4.b. Disclaimer Data */
    if(sRespostas.getRange(fila,46,1,1).getValue().toString() != ""){
      var cancellationFeePrevB = sRespostas.getRange(fila,46,1,1).getValue();
    }
    if(sRespostas.getRange(fila,47,1,1).getValue().toString() != ""){
      var cancellationFeeAfterB = sRespostas.getRange(fila,47,1,1).getValue();
    }
    
    if(sRespostas.getRange(fila,48,1,1).getValue().toString() != ""){
      var scalability1B = sRespostas.getRange(fila,48,1,1).getValue();
    }
    if(sRespostas.getRange(fila,49,1,1).getValue().toString() != ""){
      var scalabilityDiscount1B = sRespostas.getRange(fila,49,1,1).getValue();
    }
    if(sRespostas.getRange(fila,50,1,1).getValue().toString() != ""){
      var scalability2B = sRespostas.getRange(fila,50,1,1).getValue();
    }
    if(sRespostas.getRange(fila,51,1,1).getValue().toString() != ""){
      var scalabilityDiscount2B = sRespostas.getRange(fila,51,1,1).getValue();
    }
    if(sRespostas.getRange(fila,52,1,1).getValue().toString() != ""){
      var dueDaysB = sRespostas.getRange(fila,52,1,1).getValue();
    }
    if(sRespostas.getRange(fila,53,1,1).getValue().toString() != ""){
      var timingResponseB = sRespostas.getRange(fila,53,1,1).getValue();
    }
    if(sRespostas.getRange(fila,54,1,1).getValue().toString() != ""){
      var timingExecuteB = sRespostas.getRange(fila,54,1,1).getValue();
    }
    if(sRespostas.getRange(fila,55,1,1).getValue().toString() != ""){
      var exclusivityDaysB = sRespostas.getRange(fila,55,1,1).getValue();
    }    
    if(sRespostas.getRange(fila,78,1,1).getValue().toString() != 0){
    var referralFeeB = sRespostas.getRange(fila,78,1,1).getValue();
    }
    if(sRespostas.getRange(fila,81,1,1).getValue().toString() != 0){
        var positionSalaryB = sRespostas.getRange(fila,81,1,1).getValue();
      }
    modalityB = sRespostas.getRange(fila,91,1,1).getValue();
    potentialB = sRespostas.getRange(fila,92,1,1).getValue();      

    if(sRespostas.getRange(fila,56,1,1).getValue() == "Yes")
    {
      /* ++++ repetir aqui 3.C Y 4.C ++++ */
      qtyJob++;
      /* 3.c. Fee Data */
      var propTitleShowC = sRespostas.getRange(fila,57,1,1).getValue();
      proposalSubtitleC = sRespostas.getRange(fila,58,1,1).getValue();
      var coinC = sRespostas.getRange(fila,59,1,1).getValue();

      if(sRespostas.getRange(fila,60,1,1).getValue().toString() !=""){
        var flatFeeMonthC = sRespostas.getRange(fila,60,1,1).getValue();
      }
      if(sRespostas.getRange(fila,61,1,1).getValue().toString() != ""){
        var flatFeePositionC = sRespostas.getRange(fila,61,1,1).getValue();
      }
      if(sRespostas.getRange(fila,62,1,1).getValue().toString() != ""){
        var coveredC = sRespostas.getRange(fila,62,1,1).getValue();
      }

      if(sRespostas.getRange(fila,63,1,1).getValue().toString() != ""){
        feeC = sRespostas.getRange(fila,63,1,1).getValue();
      }

      if(sRespostas.getRange(fila,64,1,1).getValue().toString() != ""){
        var retainerFeeC = sRespostas.getRange(fila,64,1,1).getValue();
      }
      if(sRespostas.getRange(fila,65,1,1).getValue().toString() != ""){
        var intermediateFeeC = sRespostas.getRange(fila,65,1,1).getValue();
      }
      if(sRespostas.getRange(fila,66,1,1).getValue().toString() != ""){
        var completionFeeC = sRespostas.getRange(fila,66,1,1).getValue();
      }

      /* 4.c. Disclaimer Data */
      if(sRespostas.getRange(fila,67,1,1).getValue().toString() != ""){
        var cancellationFeePrevC = sRespostas.getRange(fila,67,1,1).getValue();
      }
      if(sRespostas.getRange(fila,68,1,1).getValue().toString() != ""){
        var cancellationFeeAfterC = sRespostas.getRange(fila,68,1,1).getValue();
      }
      if(sRespostas.getRange(fila,69,1,1).getValue().toString() != ""){
        var scalability1C = sRespostas.getRange(fila,69,1,1).getValue();
      }
      if(sRespostas.getRange(fila,70,1,1).getValue().toString() != ""){
        var scalabilityDiscount1C = sRespostas.getRange(fila,70,1,1).getValue();
      }
      if(sRespostas.getRange(fila,71,1,1).getValue().toString() != ""){
        var scalability2C = sRespostas.getRange(fila,71,1,1).getValue();
      }
      if(sRespostas.getRange(fila,72,1,1).getValue().toString() != ""){
        var scalabilityDiscount2C = sRespostas.getRange(fila,72,1,1).getValue();
      }
      if(sRespostas.getRange(fila,73,1,1).getValue().toString() != ""){
        var dueDaysC = sRespostas.getRange(fila,73,1,1).getValue();
      }
      if(sRespostas.getRange(fila,74,1,1).getValue().toString() != ""){
        var timingResponseC = sRespostas.getRange(fila,74,1,1).getValue();
      }
      if(sRespostas.getRange(fila,75,1,1).getValue().toString() != ""){
        var timingExecuteC = sRespostas.getRange(fila,75,1,1).getValue();
      }
      if(sRespostas.getRange(fila,76,1,1).getValue().toString() != ""){
        var exclusivityDaysC = sRespostas.getRange(fila,76,1,1).getValue();
      }
      if(sRespostas.getRange(fila,79,1,1).getValue().toString() != ""){
        var referralFeeC = sRespostas.getRange(fila,79,1,1).getValue();
      }
      if(sRespostas.getRange(fila,82,1,1).getValue().toString() != ""){
        var positionSalaryC = sRespostas.getRange(fila,82,1,1).getValue();
      }
      modalityC = sRespostas.getRange(fila,93,1,1).getValue();
      potentialC = sRespostas.getRange(fila,94,1,1).getValue();
    }
    }

    //pego o ano
    var year = time.getFullYear();
    //converto o nome do mês
    var monthName;
    var month = time.getMonth();
    switch(month){
      case 0:
        monthName = 'Janeiro';
        break;
      case 1:
        monthName = 'Fevereiro';
        break;
      case 2:
        monthName = 'Março';
        break;
      case 3:
        monthName = 'Abril';
        break;
      case 4:
        monthName = 'Maio';
        break;
      case 5:
        monthName = 'Junho';
        break;
      case 6:
        monthName = 'Julho';
        break;
      case 7:
        monthName = 'Agosto';
        break;
      case 8:
        monthName = 'Setembro';
        break;
      case 9:
        monthName = 'Outubro';
        break;
      case 10:
        monthName = 'Novembro';
        break;
      case 11:
        monthName = 'Dezembro';
        break;
    }

    //passo os dados pela hora no DB_Proposal
    //abro spreadsheet DB_Proposal

    switch(comercialEmail){
      case 'grazielly.sena@growgroup.us':
        comercialName = 'Grazielly Sena';
        break;
      
      case 'guilherme.marinho@growgroup.us':
        comercialName : 'Guilherme Marinho';
        break;

      case 'danilo.lastrucci@growgroup.us':
        comercialName = 'Danilo Lastrucci';
        break;

      case 'rubem.moraes@growgroup.us':
        comercialName = 'Rubem Moraes';
        break;

      case 'eduarda.spencer@growgroup.us':
        comercialName = 'Eduarda Spencer';
        break;

      case 'felipemancano@growgroup.us':
        comercialName = 'Felipe Mançano';
        break;

      case 'alankarzovnik@growgroup.us':
        comercialName = 'Alan Karzovnik';
        break;

      case 'rebeca.cavalcanti@growgroup.us':
        comercialName = 'Rebeca Cavalcanti';
        break;
    }

    

    //coloco os dados seguindo o B.U.
    switch(bu){
    case "Mendoza - AR":
    buEmail = "alankarzovnik@growgroup.us";
    buFolder = "1iOC1sqFVmbwr4yajtb66NtT7F8Pm10Ln";
    buCode = "MDZ1AR";
    break;

    case "Lima - PR":
    buEmail = "eduardo.cuadra@growgroup.us";
    buFolder = "1PuWhwgveTJQ3LXlP70ibKTxnX-KMKGsD";
    buCode = "LIM1PE";
    break;

    case "Recife - BR":
    buEmail = "felipemancano@growgroup.us";
    buFolder = "1-sYsmQjj4AsA4b1wnwR--8f87eBpjCuE";
    buCode = "REC1BR";
    break;

    case "Ribeirão Preto - BR":
    buEmail = "fernanda.minniti@growgroup.us";
    buFolder = "1FLnNE2sN1iLrDYYeg_lFxGv-VXJMw9Qk";
    buCode = "RAO1BR";
    break;

    case "USA":
    buEmail = "daniel.pizarro@growgroup.us";
    buFolder = "1dETTbZ0BEzjqij_u5kzw6DCp0QeBgZyC";
    buCode = "ATL1US";
    break;

    case "Santiago - CL (Ramiro Parra)":
    buEmail = "cesarantunes@growgroup.us";
    buFolder = "1GZ3d08Js5vFmBSK775YnSw9nWUVOBFe-";
    buCode = "SCL1CL";
    break;

    case "Santiago - CL (Sebastián Selle)":
    buEmail = "sebastian.selle@growgroup.us";
    buFolder = "1qRWJohDyj5DSmYM3jFNazAqDoC8ysjgL";
    buCode = "SCL2CL";
    break;

    case "São Paulo - SP":
    buEmail = "danilo.lastrucci@growgroup.us";
    buFolder = "1-sYsmQjj4AsA4b1wnwR--8f87eBpjCuE";
    buCode = "SAO1BR";
    break;
    }

    sBd.getRange(rowBd,2,1,1).setValue(bu);
    sBd.getRange(rowBd,4,1,1).setValue(compFantasyName);
    sBd.getRange(rowBd,5,1,1).setValue(compWeb);
    sBd.getRange(rowBd,6,1,1).setValue(compBusinessName);
    sBd.getRange(rowBd,7,1,1).setValue(compId);
    sBd.getRange(rowBd,8,1,1).setValue(compAddress);
    sBd.getRange(rowBd,9,1,1).setValue(contactPerson);
    sBd.getRange(rowBd,10,1,1).setValue(contactRole);
    sBd.getRange(rowBd,11,1,1).setValue(contactEmail);
    sBd.getRange(rowBd,12,1,1).setValue(contactPhone);
    sBd.getRange(rowBd,14,1,1).setValue(country);
    if(propTitleShowA == 'Yes'){
    if(flatFeeMonth > 0)  {
      if(retainerFee > 0) {proposalTitleA = "Flat Retainer";}
      else if(retainerFee == 0 && intermediateFee > 0) {proposalTitleA = "Flat Intermediate";}
      else if(retainerFee == 0 && intermediateFee == 0) {proposalTitleA = "Flat";}
    }
    else if(flatFeeMonth == 0) {
      if(retainerFee > 0) {proposalTitleA = "Retainer";}
      else if(retainerFee == 0 && intermediateFee > 0) {proposalTitleA = "Intermediate";}
      else if(retainerFee == 0 && intermediateFee == 0) {proposalTitleA = "Success";}
    }
    }
    sBd.getRange(rowBd,15,1,1).setValue(proposalTitleA);
    sBd.getRange(rowBd,16,1,1).setValue(proposalSubtitleA);
    sBd.getRange(rowBd,17,1,1).setValue(coin);
    sBd.getRange(rowBd,18,1,1).setValue(flatFeeMonth);
    sBd.getRange(rowBd,19,1,1).setValue(flatFeePosition);
    sBd.getRange(rowBd,20,1,1).setValue(covered);
    sBd.getRange(rowBd,21,1,1).setValue(fee);
    sBd.getRange(rowBd,22,1,1).setValue(retainerFee);
    sBd.getRange(rowBd,23,1,1).setValue(intermediateFee);
    sBd.getRange(rowBd,24,1,1).setValue(completionFee);
    sBd.getRange(rowBd,25,1,1).setValue(cancellationFeePrev);
    sBd.getRange(rowBd,26,1,1).setValue(cancellationFeeAfter);
    sBd.getRange(rowBd,27,1,1).setValue(scalability1);
    sBd.getRange(rowBd,28,1,1).setValue(scalabilityDiscount1);
    sBd.getRange(rowBd,29,1,1).setValue(scalability2);
    sBd.getRange(rowBd,30,1,1).setValue(scalabilityDiscount2);
    sBd.getRange(rowBd,31,1,1).setValue(dueDays);
    sBd.getRange(rowBd,32,1,1).setValue(timingResponse);
    sBd.getRange(rowBd,33,1,1).setValue(timingExecute);
    sBd.getRange(rowBd,34,1,1).setValue(exclusivityDays);
    sBd.getRange(rowBd,43,1,1).setValue(time);
    sBd.getRange(rowBd,35,1,1).setValue(warrantyDays);


    var baseCode = sBd.getRange(rowBd, 46, 1, 1).getValue();
    proposalCode = String(baseCode) + buCode;

    sBd.getRange(rowBd,1,1,1).setValue(proposalCode);
    sBd.getRange(rowBd,58,1,1).setValue(referralFeeA);
    sBd.getRange(rowBd,61,1,1).setValue(positionSalaryA);

    //pego o uf na planilha Controle Comercial
    ufPcc = pCC.getLastRow();
    ufPcc ++;
    Logger.log(ufPcc);

    //passo os dados para a Planilha de Controle Comercial
    pCC.getRange(ufPcc,1,1,1).setValue(proposalCode);
    pCC.getRange(ufPcc,2,1,1).setValue(time);
    pCC.getRange(ufPcc,3,1,1).setValue(monthName);
    pCC.getRange(ufPcc,4,1,1).setValue(year);
    pCC.getRange(ufPcc,5,1,1).setValue(bu);
    pCC.getRange(ufPcc,6,1,1).setValue(typeSale);
    pCC.getRange(ufPcc,7,1,1).setValue(compFantasyName);
    pCC.getRange(ufPcc,8,1,1).setValue(typeProposal);
    pCC.getRange(ufPcc,9,1,1).setValue(segment);
    pCC.getRange(ufPcc,10,1,1).setValue(originContact);
    pCC.getRange(ufPcc,11,1,1).setValue(comercialName);
    pCC.getRange(ufPcc,12,1,1).setValue('Grow Consulting');
    pCC.getRange(ufPcc,13,1,1).setValue('R&S');
    pCC.getRange(ufPcc,17,1,1).setValue(potentialA);
    pCC.getRange(ufPcc,19,1,1).setValue(modalityA);

    if(balaPrata == 'Yes'){
      pCC.getRange(ufPcc,14,1,1).setValue('18%');  
      pCC.getRange(ufPcc,15,1,1).setValue('');
      pCC.getRange(ufPcc,16,1,1).setValue('Proposta');
    }
    else{
      pCC.getRange(ufPcc,14,1,1).setValue(fee+'%');
      pCC.getRange(ufPcc,15,1,1).setValue(positionSalaryA);
      pCC.getRange(ufPcc,16,1,1).setValue('Proposta');
    }
    
  
    //se há mais de um projeto copio os dados para a fila seguinte
    if(qtyJob>1)
    {
    var auxFila = rowBd + 1;
    
    sBd.getRange(auxFila,1,1,1).setValue(proposalCode);
    sBd.getRange(auxFila,2,1,1).setValue(bu);
    sBd.getRange(auxFila,4,1,1).setValue(compFantasyName);
    sBd.getRange(auxFila,5,1,1).setValue(compWeb);
    sBd.getRange(auxFila,6,1,1).setValue(compBusinessName);
    sBd.getRange(auxFila,7,1,1).setValue(compId);
    sBd.getRange(auxFila,8,1,1).setValue(compAddress);
    sBd.getRange(auxFila,9,1,1).setValue(contactPerson);
    sBd.getRange(auxFila,10,1,1).setValue(contactRole);
    sBd.getRange(auxFila,11,1,1).setValue(contactEmail);
    sBd.getRange(auxFila,12,1,1).setValue(contactPhone);
    if(propTitleShowB == 'Yes'){
    if(flatFeeMonthB > 0)  {
      if(retainerFeeB > 0) {proposalTitleB = "Flat Retainer";}
      else if(retainerFeeB == 0 && intermediateFee > 0) {proposalTitleB = "Flat Intermediate";}
      else if(retainerFeeB == 0 && intermediateFee == 0) {proposalTitleB = "Flat";}
      }
    else if(flatFeeMonthB == 0) {
      if(retainerFeeB > 0) {proposalTitleB = "Retainer";}
      else if(retainerFeeB == 0 && intermediateFee > 0) {proposalTitleB = "Intermediate";}
      else if(retainerFeeB == 0 && intermediateFee == 0) {proposalTitleB = "Success";}
      }
    }
    sBd.getRange(auxFila,15,1,1).setValue(proposalTitleB);
    sBd.getRange(auxFila,16,1,1).setValue(proposalSubtitleB);
    sBd.getRange(auxFila,17,1,1).setValue(coinB);
    sBd.getRange(auxFila,18,1,1).setValue(flatFeeMonthB);
    sBd.getRange(auxFila,19,1,1).setValue(flatFeePositionB);
    sBd.getRange(auxFila,20,1,1).setValue(coveredB);
    sBd.getRange(auxFila,21,1,1).setValue(feeB);
    sBd.getRange(auxFila,22,1,1).setValue(retainerFeeB);
    sBd.getRange(auxFila,23,1,1).setValue(intermediateFeeB);
    sBd.getRange(auxFila,24,1,1).setValue(completionFeeB);
    sBd.getRange(auxFila,25,1,1).setValue(cancellationFeePrevB);
    sBd.getRange(auxFila,26,1,1).setValue(cancellationFeeAfterB);
    sBd.getRange(auxFila,27,1,1).setValue(scalability1B);
    sBd.getRange(auxFila,28,1,1).setValue(scalabilityDiscount1B);
    sBd.getRange(auxFila,29,1,1).setValue(scalability2B);
    sBd.getRange(auxFila,30,1,1).setValue(scalabilityDiscount2B);
    sBd.getRange(auxFila,31,1,1).setValue(dueDaysB);
    sBd.getRange(auxFila,32,1,1).setValue(timingResponseB);
    sBd.getRange(auxFila,33,1,1).setValue(timingExecuteB);
    sBd.getRange(auxFila,34,1,1).setValue(exclusivityDaysB);
    sBd.getRange(auxFila,43,1,1).setValue(time);
    sBd.getRange(auxFila,59,1,1).setValue(referralFeeB);
    sBd.getRange(auxFila,62,1,1).setValue(positionSalaryB);

    //passo os dados a Planilha de Controle Comercial
    ufPcc ++;
    pCC.getRange(ufPcc,1,1,1).setValue(proposalCode);
    pCC.getRange(ufPcc,2,1,1).setValue(time);
    pCC.getRange(ufPcc,3,1,1).setValue(monthName);
    pCC.getRange(ufPcc,4,1,1).setValue(year);
    pCC.getRange(ufPcc,5,1,1).setValue(bu);
    pCC.getRange(ufPcc,6,1,1).setValue(typeSale);
    pCC.getRange(ufPcc,7,1,1).setValue(compFantasyName);
    pCC.getRange(ufPcc,8,1,1).setValue(typeProposal);
    pCC.getRange(ufPcc,9,1,1).setValue(segment);
    pCC.getRange(ufPcc,10,1,1).setValue(originContact);
    pCC.getRange(ufPcc,11,1,1).setValue(comercialName);
    pCC.getRange(ufPcc,12,1,1).setValue('Grow Consulting');
    pCC.getRange(ufPcc,13,1,1).setValue('R&S');
    pCC.getRange(ufPcc,14,1,1).setValue(feeB+'%');
    pCC.getRange(ufPcc,15,1,1).setValue(positionSalaryB);
    pCC.getRange(ufPcc,16,1,1).setValue('Proposta');
    pCC.getRange(ufPcc,17,1,1).setValue(potentialB);
    pCC.getRange(ufPcc,19,1,1).setValue(modalityB);
  
    if(qtyJob>2)
    {
      auxFila++;
      
      sBd.getRange(auxFila,1,1,1).setValue(proposalCode);
      sBd.getRange(auxFila,2,1,1).setValue(bu);
      sBd.getRange(auxFila,4,1,1).setValue(compFantasyName);
      sBd.getRange(auxFila,5,1,1).setValue(compWeb);
      sBd.getRange(auxFila,6,1,1).setValue(compBusinessName);
      sBd.getRange(auxFila,7,1,1).setValue(compId);
      sBd.getRange(auxFila,8,1,1).setValue(compAddress);
      sBd.getRange(auxFila,9,1,1).setValue(contactPerson);
      sBd.getRange(auxFila,10,1,1).setValue(contactRole);
      sBd.getRange(auxFila,11,1,1).setValue(contactEmail);
      sBd.getRange(auxFila,12,1,1).setValue(contactPhone);
      if(propTitleShowC == 'Yes'){
      if(flatFeeMonthC > 0)  {
        if(retainerFeeC > 0) {proposalTitleC = "Flat Retainer";}
        else if(retainerFeeC == 0 && intermediateFeeC > 0) {proposalTitleC = "Flat Intermediate";}
        else if(retainerFeeC == 0 && intermediateFeeC == 0) {proposalTitleC = "Flat";}
        }
        else if(flatFeeMonthC == 0) {
          if(retainerFeeC > 0) {proposalTitleC = "Retainer";}
          else if(retainerFeeC == 0 && intermediateFeeC > 0) {proposalTitleC = "Intermediate";}
          else if(retainerFeeC == 0 && intermediateFeeC == 0) {proposalTitleC = "Success";}
        }
      }
      sBd.getRange(auxFila,15,1,1).setValue(proposalTitleC);
      sBd.getRange(auxFila,16,1,1).setValue(proposalSubtitleC);
      sBd.getRange(auxFila,17,1,1).setValue(coinC);
      sBd.getRange(auxFila,18,1,1).setValue(flatFeeMonthC);
      sBd.getRange(auxFila,19,1,1).setValue(flatFeePositionC);
      sBd.getRange(auxFila,20,1,1).setValue(coveredC);
      sBd.getRange(auxFila,21,1,1).setValue(feeC);
      sBd.getRange(auxFila,22,1,1).setValue(retainerFeeC);
      sBd.getRange(auxFila,23,1,1).setValue(intermediateFeeC);
      sBd.getRange(auxFila,24,1,1).setValue(completionFeeC);
      sBd.getRange(auxFila,25,1,1).setValue(cancellationFeePrevC);
      sBd.getRange(auxFila,26,1,1).setValue(cancellationFeeAfterC);
      sBd.getRange(auxFila,27,1,1).setValue(scalability1C);
      sBd.getRange(auxFila,28,1,1).setValue(scalabilityDiscount1C);
      sBd.getRange(auxFila,29,1,1).setValue(scalability2C);
      sBd.getRange(auxFila,30,1,1).setValue(scalabilityDiscount2C);
      sBd.getRange(auxFila,31,1,1).setValue(dueDaysC);
      sBd.getRange(auxFila,32,1,1).setValue(timingResponseC);
      sBd.getRange(auxFila,33,1,1).setValue(timingExecuteC);
      sBd.getRange(auxFila,34,1,1).setValue(exclusivityDaysC);
      sBd.getRange(auxFila,43,1,1).setValue(time);
      sBd.getRange(auxFila,60,1,1).setValue(referralFeeC);
      sBd.getRange(auxFila,63,1,1).setValue(positionSalaryC);

      //passo os dados para a Planilha de Controle Comercial
      ufPcc = ufPcc + 1;
      pCC.getRange(ufPcc,1,1,1).setValue(proposalCode);
      pCC.getRange(ufPcc,2,1,1).setValue(time);
      pCC.getRange(ufPcc,3,1,1).setValue(monthName);
      pCC.getRange(ufPcc,4,1,1).setValue(year);
      pCC.getRange(ufPcc,5,1,1).setValue(bu);
      pCC.getRange(ufPcc,6,1,1).setValue(typeSale);
      pCC.getRange(ufPcc,7,1,1).setValue(compFantasyName);
      pCC.getRange(ufPcc,8,1,1).setValue(typeProposal);
      pCC.getRange(ufPcc,9,1,1).setValue(segment);
      pCC.getRange(ufPcc,10,1,1).setValue(originContact);
      pCC.getRange(ufPcc,11,1,1).setValue(comercialName);
      pCC.getRange(ufPcc,12,1,1).setValue('Grow Consulting');
      pCC.getRange(ufPcc,13,1,1).setValue('R&S');
      pCC.getRange(ufPcc,14,1,1).setValue(feeC+'%');
      pCC.getRange(ufPcc,15,1,1).setValue(positionSalaryC);
      pCC.getRange(ufPcc,16,1,1).setValue('Proposta');
      pCC.getRange(ufPcc,17,1,1).setValue(potentialC);
      pCC.getRange(ufPcc,19,1,1).setValue(modalityC);
    }
    }

    //converto os textos Fee para a segunda linguagem
    if(lenguage == 'English') {
    flatFeeMonthText = convertUsd(flatFeeMonth);
    flatFeeMonthBText = convertUsd(flatFeeMonthB);
    flatFeeMonthCText = convertUsd(flatFeeMonthC);

    positionSalaryAText = convertUsd(positionSalaryA);
    positionSalaryBText = convertUsd(positionSalaryB);
    positionSalaryCText = convertUsd(positionSalaryC);

    flatFeePositionText = convertUsd(flatFeePosition);
    flatFeePositionBText = convertUsd(flatFeePositionB);
    flatFeePositionCText = convertUsd(flatFeePositionC);
    }
    else {
    flatFeeMonthText = convertPeso(flatFeeMonth);
    flatFeeMonthBText = convertPeso(flatFeeMonthB);
    flatFeeMonthCText = convertPeso(flatFeeMonthC);

    positionSalaryAText = convertPeso(positionSalaryA);
    positionSalaryBText = convertPeso(positionSalaryB);
    positionSalaryCText = convertPeso(positionSalaryC);

    flatFeePositionText = convertPeso(flatFeePosition);
    flatFeePositionBText = convertPeso(flatFeePositionB);
    flatFeePositionCText = convertPeso(flatFeePositionC)
    }
    /* BALA DE PRATA */
    if(balaPrata == 'Yes'){

      //Abro slide modelo
      var slideModelo = DriveApp.getFileById('1SJ5mS9XWgQ9UaKG8gHDjqvl4zmcz_exqQuI82I6aqLQ');

      //Duplico slide e o nome
      var proposalCodeName = 'Proposta Recrutamento e Seleção-  ' + proposalCode
      slideModelo.makeCopy(proposalCodeName,DriveApp.getFolderById(dbFolder));

      //busco arquivo que foi criado
      var files = DriveApp.getFilesByName(proposalCodeName);

      while (files.hasNext()) {
      var file = files.next();
      }

      //busco o link do arquivo que foi criado
      var urlSlide = file.getUrl();
      //abro el archivo
      var slides = SlidesApp.openByUrl(urlSlide);

      pCC.getRange(ufPcc,23,1,1).setValue(urlSlide);

      //abro Slide
      var slidesss = slides.getSlides();

      /* +++ forEach para preencher os dados segundo o formulário +++ */
      slidesss.forEach(function(slide,index){
      var shapes = (slide.getShapes());
  
        if(index==5) 
        {
          shapes.forEach(function(shape){
            if(shape.getShapeType() == 'TEXT_BOX'){
              shape.getText().replaceAllText('{{clientName}}',contactPerson);
              shape.getText().replaceAllText('{{clientCnpj}}',compId);
              shape.getText().replaceAllText('{{clientPhone}}',contactPhone);
              shape.getText().replaceAllText('{{clientEmail}}',contactEmail);
              shape.getText().replaceAllText('{{timestamp}}','');
              shape.getText().replaceAllText('{{clientPosition}}',contactRole);
            }
          })
        }
      })
      /* +++ forEach para preencher os dados segundo os projetos +++ */

      slides.saveAndClose();
      slides = SlidesApp.openByUrl(urlSlide);

      var slideId = slides.getId(); 

      var fileAtach = DriveApp.getFileById(slideId);

      /* +++ converto para PDF +++ */
      var blob = fileAtach.getBlob();
      var saveFolder = DriveApp.getFolderById(dbFolder);
      var pdfFile = saveFolder.createFile(blob);
      pdfFile.setName(proposalCodeName+".pdf");
      var urlPdf = pdfFile.getUrl();
      /* +++ Termino a conversão para PDF +++ */

      /* acesso diretamente o arquivo */
      var targetId = pdfFile.getId(); // Please set the ID of target file or folder.
      var shortcutName = proposalCodeName; // Please set the shortcut name.
      var folderId = DriveApp.getFolderById(buFolder);
      DriveApp.createShortcut(targetId).moveTo(folderId);

      //pego a URL dos arquivos no DB_Proposal
      sBd.getRange(rowBd,44,1,1).setValue(urlSlide);  
      sBd.getRange(rowBd,45,1,1).setValue(urlPdf);

      GmailApp.sendEmail(comercialEmail,"New proposal generated", "Hello!\n\nEverything went excellent, attached you have your proposal generated in PDF format ready to send.\nYou can also see in this link,   the editable document: " + urlSlide,{bcc: "cesarantunes@growgroup.us", attachments: [pdfFile.getAs(MimeType.PDF)], name: "Grow Group Automation"});

      var nextRowBD = rowBd + qtyJob;
      ssDb.getSheetByName('validation').getRange("N2").setValue(nextRowBD);


    }
    /* BALA DE PRATA */
    else{

      //coloco a coluna para seguir a linguagem
      switch(lenguage){
      
      case "Português":
      colLang = 3;
      break;

      case "English":
      colLang = 4;
      break;

      case "Español":
      colLang = 5;
      break;
      }

      //Abro archivo modelo
      modelo = DriveApp.getFileById('1SJ5mS9XWgQ9UaKG8gHDjqvl4zmcz_exqQuI82I6aqLQ');

      //Duplico slide y lo nombre
      var proposalCodeName = 'Proposta Recrutamento e Seleção - ' + proposalCode
      modelo.makeCopy(proposalCodeName,DriveApp.getFolderById(dbFolder));

      //Copio y pego en la BD el codigo de propuesta si es mas de una vacante
      if(qtyJob>1)
      {
      var aux = rowBd + 1;
      var auxQtyJob = rowBd + qtyJob;
      for(i = aux; i < auxQtyJob; i++)
      {
        Logger.log("valor de i: "+i);
        sBd.getRange(i,1,1,1).setValue(proposalCode);
      }
      }

      //busco archivo creado
      var files = DriveApp.getFilesByName(proposalCodeName);

      while (files.hasNext()) {
      var file = files.next();
      }

      //obtengo la url del archivo creado
      var urlSlide = file.getUrl();
      //abro el archivo
      var slides = SlidesApp.openByUrl(urlSlide);

      pCC.getRange(ufPcc,23,1,1).setValue(urlSlide);

      //bucle para buscar y reemplazar los textos en la propuesta
      var slidesss = slides.getSlides();
      Logger.log("slidesss: "+slidesss);
      slidesss.forEach(function(slide){ 
         var shapes = (slide.getShapes());
         shapes.forEach(function(shape){
           if(shape.getShapeType() == 'TEXT_BOX'){
             //completo el texto de la propuesta segun idioma
             //page1
             shape.getText().replaceAllText('{{proposal}}',bdTxt.getRange(3,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{proposalCode}}',bdTxt.getRange(4,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{comFantasyName}}',bdTxt.getRange(5,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{contactPerson}}',bdTxt.getRange(6,colLang,1,1).getValue());
             //page2
             shape.getText().replaceAllText('{{aboutTitle}}',bdTxt.getRange(8,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{about}}',bdTxt.getRange(9,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{servicesTitle}}',bdTxt.getRange(10,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{services}}',bdTxt.getRange(11,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{tx9}}',bdTxt.getRange(12,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{tx10}}',bdTxt.getRange(13,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{tx11}}',bdTxt.getRange(14,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{tx12}}',bdTxt.getRange(15,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{tx13}}',bdTxt.getRange(16,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{tx14}}',bdTxt.getRange(17,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{tx15}}',bdTxt.getRange(18,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{tx16}}',bdTxt.getRange(19,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{growWayTitle}}',bdTxt.getRange(20,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{tx18}}',bdTxt.getRange(21,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{tx19}}',bdTxt.getRange(22,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{tx20}}',bdTxt.getRange(23,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{tx21}}',bdTxt.getRange(24,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{tx22}}',bdTxt.getRange(25,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{tx23}}',bdTxt.getRange(26,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{tx24}}',bdTxt.getRange(27,colLang,1,1).getValue());
             //page3
             shape.getText().replaceAllText('{{OurTeamTitle}}',bdTxt.getRange(29,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{juanName}}',bdTxt.getRange(30,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{juanDescription}}',bdTxt.getRange(31,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{felipeName}}',bdTxt.getRange(32,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{felipeDescription}}',bdTxt.getRange(33,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{carlaName}}',bdTxt.getRange(34,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{carlaDescription}}',bdTxt.getRange(35,colLang,1,1).getValue());
             //shape.getText().replaceAllText('{{marceloName}}',bdTxt.getRange(36,colLang,1,1).getValue());
             //shape.getText().replaceAllText('{{marceloDescription}}',bdTxt.getRange(37,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{leaName}}',bdTxt.getRange(38,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{leaDescription}}',bdTxt.getRange(39,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{whereTitle}}',bdTxt.getRange(42,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{recognitionTitle}}',bdTxt.getRange(43,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{onuText}}',bdTxt.getRange(44,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{gptwText}}',bdTxt.getRange(45,colLang,1,1).getValue());
             //page 4, 5 y 6
             shape.getText().replaceAllText('{{proposal}}',bdTxt.getRange(47,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{proposalTitle}}',bdTxt.getRange(48,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{proposalSubtitle}}',bdTxt.getRange(49,colLang,1,1).getValue());

             if(positionSalaryA == 0){
               shape.getText().replaceAllText('{{positionSalaryA}}','');
             }
             else{
               shape.getText().replaceAllText('{{positionSalaryA}}',bdTxt.getRange(117,colLang,1,1).getValue());
             }
             if(fee == 0 || fee == ''){
               shape.getText().replaceAllText('{{feeTextA}}','');  
             }
             else{
               shape.getText().replaceAllText('{{feeTextA}}',bdTxt.getRange(50,colLang,1,1).getValue());
             }
             if(positionSalaryB == 0){
               shape.getText().replaceAllText('{{positionSalaryB}}','');
             }
             else{
               shape.getText().replaceAllText('{{positionSalaryB}}',bdTxt.getRange(117,colLang,1,1).getValue());
             }
             if(feeB == 0 || feeB == ''){
               shape.getText().replaceAllText('{{feeTextB}}','');  
             }
             else{
               shape.getText().replaceAllText('{{feeTextB}}',bdTxt.getRange(50,colLang,1,1).getValue());
             }
             if(positionSalaryC == 0){
               shape.getText().replaceAllText('{{positionSalaryC}}','');
             }
             else{
               shape.getText().replaceAllText('{{positionSalaryC}}',bdTxt.getRange(117,colLang,1,1).getValue());
             }
             if(feeC == 0 || feeC == ''){
               shape.getText().replaceAllText('{{feeTextC}}','');  
             }
             else{
               shape.getText().replaceAllText('{{feeTextC}}',bdTxt.getRange(50,colLang,1,1).getValue());
             }
             if(flatFeeMonth == 0) {
               shape.getText().replaceAllText('{{flatFeePerMonthA}}','');
             }
             else {
               shape.getText().replaceAllText('{{flatFeePerMonthA}}',bdTxt.getRange(51,colLang,1,1).getValue());
             }
             if(flatFeePosition == 0) {
               shape.getText().replaceAllText('{{flatFeePerPositionA}}','');
             }
             else {
               shape.getText().replaceAllText('{{flatFeePerPositionA}}',bdTxt.getRange(52,colLang,1,1).getValue());
             }

             if(flatFeeMonth == 0) {
               shape.getText().replaceAllText('{{flatFeePerMonthB}}','');
             }
             else {
               shape.getText().replaceAllText('{{flatFeePerMonthB}}',bdTxt.getRange(51,colLang,1,1).getValue());
             }
             if(flatFeePosition == 0) {
               shape.getText().replaceAllText('{{flatFeePerPositionB}}','');
             }
             else {
               shape.getText().replaceAllText('{{flatFeePerPositionB}}',bdTxt.getRange(52,colLang,1,1).getValue());
             }
             if(flatFeeMonth == 0) {
               shape.getText().replaceAllText('{{flatFeePerMonthC}}','');
             }
             else {
               shape.getText().replaceAllText('{{flatFeePerMonthC}}',bdTxt.getRange(51,colLang,1,1).getValue());
             }
             if(flatFeePosition == 0) {
               shape.getText().replaceAllText('{{flatFeePerPositionC}}','');
             }
             else {
               shape.getText().replaceAllText('{{flatFeePerPositionC}}',bdTxt.getRange(52,colLang,1,1).getValue());
             }

             shape.getText().replaceAllText('{{conditions}}',bdTxt.getRange(54,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{paymentFlow}}',bdTxt.getRange(55,colLang,1,1).getValue());

             if(retainerFee == 0 && intermediateFee == 0 && completionFee == 0) {
               shape.getText().replaceAllText('{{paymentFlowDescriptionLine1A}}','');
             }
             else {
               shape.getText().replaceAllText('{{paymentFlowDescriptionLine1A}}',bdTxt.getRange(56,colLang,1,1).getValue());
             }

             if(retainerFeeB == 0 && intermediateFeeB == 0 && completionFeeB == 0) {
               shape.getText().replaceAllText('{{paymentFlowDescriptionLine1B}}','');
             }
             else {
               shape.getText().replaceAllText('{{paymentFlowDescriptionLine1B}}',bdTxt.getRange(56,colLang,1,1).getValue());
             }

             if(retainerFeeC == 0 && intermediateFeeC == 0 && completionFeeC == 0) {
               shape.getText().replaceAllText('{{paymentFlowDescriptionLine1C}}','');
             }
             else {
               shape.getText().replaceAllText('{{paymentFlowDescriptionLine1C}}',bdTxt.getRange(56,colLang,1,1).getValue());
             }

             shape.getText().replaceAllText('{{dueDaysText}}',bdTxt.getRange(57,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{shortlist}}',bdTxt.getRange(58,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{shortlistDescriptionLine1}}',bdTxt.getRange(59,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{shortlistDescriptionLine2}}',bdTxt.getRange(60,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{cancellation}}',bdTxt.getRange(61,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{cancellationDescription}}',bdTxt.getRange(62,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{recommendation}}',bdTxt.getRange(63,colLang,1,1).getValue());

             //if segun exclusivityDays
             if(exclusivityDays.toString() == "0"){
               shape.getText().replaceAllText('{{recommendationDescription}}',bdTxt.getRange(106,colLang,1,1).getValue());
             }
             else if(exclusivityDays > 0){
               shape.getText().replaceAllText('{{recommendationDescription}}',bdTxt.getRange(107,colLang,1,1).getValue());
             }
             else if(exclusivityDays.toString() == ""){
               shape.getText().replaceAllText('{{recommendationDescription}}',bdTxt.getRange(108,colLang,1,1).getValue());
             }

             shape.getText().replaceAllText('{{listValidity}}',bdTxt.getRange(65,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{listValidityDescription}}',bdTxt.getRange(66,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{scalability}}',bdTxt.getRange(67,colLang,1,1).getValue());

             if(scalability1 == 0){
               shape.getText().replaceAllText('{{scalabilityText1A}}',bdTxt.getRange(69,colLang,1,1).getValue());  
               shape.getText().replaceAllText('{{scalabilityText2A}}','');
             }
             else{
               shape.getText().replaceAllText('{{scalabilityText1A}}',bdTxt.getRange(68,colLang,1,1).getValue());
               if(scalability2 == 0){
                 shape.getText().replaceAllText('{{scalabilityText2A}}','');
               }
               else{
                 shape.getText().replaceAllText('{{scalabilityText2A}}',bdTxt.getRange(70,colLang,1,1).getValue());
               }
             }

             if(scalability1B == 0){
               shape.getText().replaceAllText('{{scalabilityText1B}}',bdTxt.getRange(69,colLang,1,1).getValue());  
               shape.getText().replaceAllText('{{scalabilityText2B}}','');
             }
             else{
               shape.getText().replaceAllText('{{scalabilityText1B}}',bdTxt.getRange(68,colLang,1,1).getValue());
               if(scalability2B == 0){
                 shape.getText().replaceAllText('{{scalabilityText2B}}','');
               }
               else{
                 shape.getText().replaceAllText('{{scalabilityText2B}}',bdTxt.getRange(70,colLang,1,1).getValue());
               }
             }

             if(scalability1C == 0){
               shape.getText().replaceAllText('{{scalabilityText1C}}',bdTxt.getRange(69,colLang,1,1).getValue());  
               shape.getText().replaceAllText('{{scalabilityText2C}}','');
             }
             else{
               shape.getText().replaceAllText('{{scalabilityText1C}}',bdTxt.getRange(68,colLang,1,1).getValue());
               if(scalability2C == 0){
                 shape.getText().replaceAllText('{{scalabilityText2C}}','');
               }
               else{
                 shape.getText().replaceAllText('{{scalabilityText2C}}',bdTxt.getRange(70,colLang,1,1).getValue());
               }
             }

             shape.getText().replaceAllText('{{feedbackTiming}}',bdTxt.getRange(72,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{feedbackTimingText}}',bdTxt.getRange(74,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{entityParts}}',bdTxt.getRange(75,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{entityPartsText}}',bdTxt.getRange(76,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{referralFee}}',bdTxt.getRange(109,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{referralFeeText1}}',bdTxt.getRange(110,colLang,1,1).getValue());
             if(referralFeeA == 0){
                  shape.getText().replaceAllText('{{referralFeeText2A}}','');  
                }
                else{
                  shape.getText().replaceAllText('{{referralFeeText2A}}',bdTxt.getRange(111,colLang,1,1).getValue());
                }

             shape.getText().replaceAllText('{{warranty}}',bdTxt.getRange(118,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{warrantyText}}',bdTxt.getRange(119,colLang,1,1).getValue());

             if(referralFeeB == 0){
                  shape.getText().replaceAllText('{{referralFeeText2B}}','');  
                }
                else{
                  shape.getText().replaceAllText('{{referralFeeText2B}}',bdTxt.getRange(111,colLang,1,1).getValue());
                }

             if(referralFeeC == 0){
                  shape.getText().replaceAllText('{{referralFeeText2C}}','');  
                }
                else{
                  shape.getText().replaceAllText('{{referralFeeText2C}}',bdTxt.getRange(111,colLang,1,1).getValue());
                }
             //page7
             shape.getText().replaceAllText('{{proposalValidation}}',bdTxt.getRange(77,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{compFantasyName}}',bdTxt.getRange(78,colLang,1,1).getValue());
             //shape.getText().replaceAllText('{{proposalSubtitleA}}',bdTxt.getRange(80,colLang,1,1).getValue());
             //shape.getText().replaceAllText('{{proposalSubtitleB}}',bdTxt.getRange(,colLang,1,1).getValue());
             //shape.getText().replaceAllText('{{proposalSubtitleC}}',bdTxt.getRange(81,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{contractorsData}}',bdTxt.getRange(82,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{name}}',bdTxt.getRange(83,colLang,1,1).getValue());

             //if segun pais
             if(country == "Argentina"){
               shape.getText().replaceAllText('{{disclaimerTaxes}}',bdTxt.getRange(112,colLang,1,1).getValue());
               shape.getText().replaceAllText('{{growName}}',bdTxt.getRange(93,colLang,1,1).getValue());  
               shape.getText().replaceAllText('{{growId}}',bdTxt.getRange(94,colLang,1,1).getValue());
               shape.getText().replaceAllText('{{growAddress}}',bdTxt.getRange(95,colLang,1,1).getValue());
               shape.getText().replaceAllText('{{growSignature}}',bdTxt.getRange(99,colLang,1,1).getValue());
               shape.getText().replaceAllText('{{growSignaturePosition}}',bdTxt.getRange(100,colLang,1,1).getValue());
               shape.getText().replaceAllText('{{growPhone}}',bdTxt.getRange(102,colLang,1,1).getValue());
               shape.getText().replaceAllText('{{growEmail}}',bdTxt.getRange(104,colLang,1,1).getValue());

             }

             else if(country == "Chile"){
               shape.getText().replaceAllText('{{disclaimerTaxes}}',bdTxt.getRange(113,colLang,1,1).getValue());
               shape.getText().replaceAllText('{{growName}}',bdTxt.getRange(96,colLang,1,1).getValue());  
               shape.getText().replaceAllText('{{growId}}',bdTxt.getRange(97,colLang,1,1).getValue());
               shape.getText().replaceAllText('{{growAddress}}',bdTxt.getRange(98,colLang,1,1).getValue());
               shape.getText().replaceAllText('{{growSignature}}',bdTxt.getRange(99,colLang,1,1).getValue());
               shape.getText().replaceAllText('{{growSignaturePosition}}',bdTxt.getRange(100,colLang,1,1).getValue());
               shape.getText().replaceAllText('{{growPhone}}',bdTxt.getRange(103,colLang,1,1).getValue());
               shape.getText().replaceAllText('{{growEmail}}',bdTxt.getRange(104,colLang,1,1).getValue());
             }

             else {
               if(contractType == "PJ"){
                 shape.getText().replaceAllText('{{disclaimerTaxes}}',bdTxt.getRange(115,colLang,1,1).getValue());
                 calcResultA = positionSalaryA * 12;
                 calcResultB = positionSalaryB * 12;
                 calcResultC = positionSalaryC * 12;
               }
               else if(contractType == "CLT"){
                 shape.getText().replaceAllText('{{disclaimerTaxes}}',bdTxt.getRange(116,colLang,1,1).getValue());
                 calcResultA = positionSalaryA * 13.33;
                 calcResultB = positionSalaryB * 13.33;
                 calcResultC = positionSalaryC * 13.33;
               }
               else{
                 shape.getText().replaceAllText('{{disclaimerTaxes}}',bdTxt.getRange(114,colLang,1,1).getValue());
                 calcResultA = positionSalaryA * 12;
                 calcResultB = positionSalaryB * 12;
                 calcResultC = positionSalaryC * 12;
               }

               shape.getText().replaceAllText('{{growName}}',bdTxt.getRange(84,colLang,1,1).getValue());
               shape.getText().replaceAllText('{{growId}}',bdTxt.getRange(86,colLang,1,1).getValue());
               shape.getText().replaceAllText('{{growAddress}}',bdTxt.getRange(88,colLang,1,1).getValue());
               shape.getText().replaceAllText('{{growSignature}}',bdTxt.getRange(91,colLang,1,1).getValue());
               shape.getText().replaceAllText('{{growSignaturePosition}}',bdTxt.getRange(92,colLang,1,1).getValue());
               shape.getText().replaceAllText('{{growPhone}}',bdTxt.getRange(101,colLang,1,1).getValue());
               shape.getText().replaceAllText('{{growEmail}}',bdTxt.getRange(105,colLang,1,1).getValue());
             }

             shape.getText().replaceAllText('{{id}}',bdTxt.getRange(85,colLang,1,1).getValue());          
             shape.getText().replaceAllText('{{address}}',bdTxt.getRange(87,colLang,1,1).getValue());
             shape.getText().replaceAllText('{{contractorData}}',bdTxt.getRange(89,colLang,1,1).getValue());

             //sigo completando el doc con los datos de la propuesta
             //page1
             shape.getText().replaceAllText('{{proposalcode}}',proposalCode);
             shape.getText().replaceAllText('{{compFantasyName}}',compFantasyName);
             shape.getText().replaceAllText('{{contactPerson}}',contactPerson);

             //page7
             shape.getText().replaceAllText('{{proposalSubtitleA}}',''+proposalSubtitleA);
             if(proposalSubtitleB != "") {
               shape.getText().replaceAllText('{{proposalSubtitleB}}',''+proposalSubtitleB);
             }
             else {
               shape.getText().replaceAllText('{{proposalSubtitleB}}',proposalSubtitleB);
             }
             if(proposalSubtitleB != "") {
               shape.getText().replaceAllText('{{proposalSubtitleC}}',''+proposalSubtitleC);
             }
             else {
               shape.getText().replaceAllText('{{proposalSubtitleC}}',proposalSubtitleC);
             }

             shape.getText().replaceAllText('{{compBusinessName}}',compBusinessName);
             shape.getText().replaceAllText('{{compId}}',compId);
             shape.getText().replaceAllText('{{compAddress}}',compAddress);
             shape.getText().replaceAllText('{{contactPerson}}',contactPerson);
             shape.getText().replaceAllText('{{contactRole}}',contactRole);
           }
          });
        })

            // Elimino hoja que no corresponda firma Grow
              if (country == 'Argentina' || country == 'Chile') {
              if (slidesss[9]) {  // Verifica se o índice 9 existe
               slidesss[9].remove();
                     }
                } else {
               if (slidesss[10]) {  // Verifica se o índice 10 existe
                   slidesss[10].remove();
                    }
              }
        slides.saveAndClose();
        slides = SlidesApp.openByUrl(urlSlide);
        //vuelvo a abrir slide
        slidesss = slides.getSlides();

        /* +++ forEach para el reemplazar datos segun proyectos +++ */
        slidesss.forEach(function(slide,index){
        var shapes = (slide.getShapes());

          if(index==3 || index==4) 
          {
            //calculo axiliar
            feeDec = fee/100;
            calcResultA = calcResultA * feeDec;
            calcResultImpA = calcResultA / 0.8367;
            calcResultImpA = calcResultImpA.toFixed(2);
            //fin calculo

            shapes.forEach(function(shape){
              if(shape.getShapeType() == 'TEXT_BOX'){
                shape.getText().replaceAllText('{{proposalTitle}}',proposalTitleA);
                shape.getText().replaceAllText('{{proposalSubtitle}}',proposalSubtitleA);
                shape.getText().replaceAllText('{{positionSalary}}',positionSalaryAText);
                shape.getText().replaceAllText('{{fee}}',fee);
                shape.getText().replaceAllText('{{flatFeeMonth}}',flatFeeMonthText);
                shape.getText().replaceAllText('{{flatFeePosition}}',flatFeePositionText);
                shape.getText().replaceAllText('{{coin}}',coin);
                shape.getText().replaceAllText('{{feeDec}}',feeDec);
                shape.getText().replaceAllText('{{calcResultText}}',calcResultA);
                shape.getText().replaceAllText('{{calcResultImpText}}',calcResultImpA);
                shape.getText().replaceAllText('{{retainerFeeA}}',retainerFee);
                shape.getText().replaceAllText('{{intermediateFeeA}}',intermediateFee);
                shape.getText().replaceAllText('{{completionFeeA}}',completionFee);
                shape.getText().replaceAllText('{{cancellationFeePrevA}}',cancellationFeePrev);
                shape.getText().replaceAllText('{{cancellationFeeAfterA}}',cancellationFeeAfter);
                shape.getText().replaceAllText('{{exclusivityDays}}',exclusivityDays);
                shape.getText().replaceAllText('{{scalability1}}',scalability1);
                shape.getText().replaceAllText('{{scalabilityDiscount1}}',scalabilityDiscount1);
                shape.getText().replaceAllText('{{scalability2}}',scalability2);
                shape.getText().replaceAllText('{{scalabilityDiscount2}}',scalabilityDiscount2);
                shape.getText().replaceAllText('{{dueDays}}',dueDays);
                shape.getText().replaceAllText('{{timingResponse}}',timingResponse);
                shape.getText().replaceAllText('{{timingExecute}}',timingExecute);
                shape.getText().replaceAllText('{{referralFeeDis}}',referralFeeA);
                shape.getText().replaceAllText('{{warrantyDays}}',warrantyDays);
              }
            })
          }

          if((index==5 || index==6) && qtyJob>1)
          {
            //calculo axiliar
            feeDec = feeB/100;
            calcResultB = calcResultB * feeDec;
            calcResultImpB = calcResultB / 0.8367;
            calcResultImpB = calcResultImpB.toFixed(2);
            //fin calculo

            shapes.forEach(function(shape){
              if(shape.getShapeType() == 'TEXT_BOX'){
                shape.getText().replaceAllText('{{proposalTitle}}',proposalTitleB);
                shape.getText().replaceAllText('{{proposalSubtitle}}',proposalSubtitleB);
                shape.getText().replaceAllText('{{positionSalary}}',positionSalaryBText);
                shape.getText().replaceAllText('{{fee}}',feeB);
                shape.getText().replaceAllText('{{flatFeeMonth}}',flatFeeMonthBText);
                shape.getText().replaceAllText('{{flatFeePosition}}',flatFeePositionBText);
                shape.getText().replaceAllText('{{coin}}',coinB);
                shape.getText().replaceAllText('{{feeDec}}',feeDec);
                shape.getText().replaceAllText('{{calcResultText}}',calcResultB);
                shape.getText().replaceAllText('{{calcResultImpText}}',calcResultImpB);
                shape.getText().replaceAllText('{{retainerFeeA}}',retainerFeeB);
                shape.getText().replaceAllText('{{intermediateFeeA}}',intermediateFeeB);
                shape.getText().replaceAllText('{{completionFeeA}}',completionFeeB);
                shape.getText().replaceAllText('{{cancellationFeePrevA}}',cancellationFeePrevB);
                shape.getText().replaceAllText('{{cancellationFeeAfterA}}',cancellationFeeAfterB);
                shape.getText().replaceAllText('{{exclusivityDays}}',exclusivityDaysB);
                shape.getText().replaceAllText('{{scalability1}}',scalability1B);
                shape.getText().replaceAllText('{{scalabilityDiscount1}}',scalabilityDiscount1B);
                shape.getText().replaceAllText('{{scalability2}}',scalability2B);
                shape.getText().replaceAllText('{{scalabilityDiscount2}}',scalabilityDiscount2B);
                shape.getText().replaceAllText('{{dueDays}}',dueDaysB);
                shape.getText().replaceAllText('{{timingResponse}}',timingResponseB);
                shape.getText().replaceAllText('{{timingExecute}}',timingExecuteB);
                shape.getText().replaceAllText('{{referralFeeDis}}',referralFeeB);
                shape.getText().replaceAllText('{{warrantyDays}}',warrantyDays);
              }
            })
          }

          if((index==7 || index==8) && qtyJob>2)
          {
            //calculo axiliar
            feeDec = feeC/100;
            calcResultC = calcResultC * feeDec;
            calcResultImpC = calcResultC / 0.8367;
            calcResultImpC = calcResultImpC.toFixed(2);
            //fin calculo

            shapes.forEach(function(shape){
              if(shape.getShapeType() == 'TEXT_BOX'){
                shape.getText().replaceAllText('{{proposalTitle}}',proposalTitleC);
                shape.getText().replaceAllText('{{proposalSubtitle}}',proposalSubtitleC);
                shape.getText().replaceAllText('{{positionSalary}}',positionSalaryCText);
                shape.getText().replaceAllText('{{fee}}',feeC);
                shape.getText().replaceAllText('{{flatFeeMonth}}',flatFeeMonthCText);
                shape.getText().replaceAllText('{{flatFeePosition}}',flatFeePositionCText);
                shape.getText().replaceAllText('{{coin}}',coinC);
                shape.getText().replaceAllText('{{feeDec}}',feeDec);
                shape.getText().replaceAllText('{{calcResultText}}',calcResultC);
                shape.getText().replaceAllText('{{calcResultImpText}}',calcResultImpC);
                shape.getText().replaceAllText('{{retainerFeeA}}',retainerFeeC);
                shape.getText().replaceAllText('{{intermediateFeeA}}',intermediateFeeC);
                shape.getText().replaceAllText('{{completionFeeA}}',completionFeeC);
                shape.getText().replaceAllText('{{cancellationFeePrevA}}',cancellationFeePrevC);
                shape.getText().replaceAllText('{{cancellationFeeAfterA}}',cancellationFeeAfterC);
                shape.getText().replaceAllText('{{exclusivityDays}}',exclusivityDaysC);
                shape.getText().replaceAllText('{{scalability1}}',scalability1C);
                shape.getText().replaceAllText('{{scalabilityDiscount1}}',scalabilityDiscount1C);
                shape.getText().replaceAllText('{{scalability2}}',scalability2C);
                shape.getText().replaceAllText('{{scalabilityDiscount2}}',scalabilityDiscount2C);
                shape.getText().replaceAllText('{{dueDays}}',dueDaysC);
                shape.getText().replaceAllText('{{timingResponse}}',timingResponseC);
                shape.getText().replaceAllText('{{timingExecute}}',timingExecuteC);
                shape.getText().replaceAllText('{{referralFeeDis}}',referralFeeC);
                shape.getText().replaceAllText('{{warrantyDays}}',warrantyDays);
              }
            })
          }
        })
        /* +++ fin forEach para el reemplazar datos segun proyectos +++ */

       // Eliminar páginas del slide si no se usan
              if (qtyJob < 3) {
            if (slidesss[8]) {  // Verifica se o índice 8 existe
              slidesss[8].remove();
             }
            if (slidesss[7]) {  // Verifica se o índice 7 existe
             slidesss[7].remove();
                }
               }
                if (qtyJob < 2) {
               if (slidesss[6]) {  // Verifica se o índice 6 existe
                slidesss[6].remove();
               }
                 if (slidesss[5]) {  // Verifica se o índice 5 existe
                 slidesss[5].remove();
                }
              }

      slides.saveAndClose();
      slides = SlidesApp.openByUrl(urlSlide);

      Logger.log("var slidesss:"+slidesss);
      Logger.log("url del slide: "+urlSlide);  
      Logger.log("var slides:"+slides);

      var slideId = slides.getId(); 
      Logger.log("var slideId:"+slideId);


      var fileAtach = DriveApp.getFileById(slideId);
      Logger.log("var fileAtach:"+fileAtach);

      /* +++ conversion a PDF +++ */
      var blob = fileAtach.getBlob();
      var saveFolder = DriveApp.getFolderById(dbFolder);
      var pdfFile = saveFolder.createFile(blob);
      pdfFile.setName(proposalCodeName+".pdf");
      var urlPdf = pdfFile.getUrl();
      /* +++ fin conversion a PDF +++ */

      /* acceso directo al archivo */
      var targetId = pdfFile.getId(); // Please set the ID of target file or folder.
      var shortcutName = proposalCodeName; // Please set the shortcut name.
      var folderId = DriveApp.getFolderById(buFolder);
      DriveApp.createShortcut(targetId).moveTo(folderId);

      //pego la url de los archivos en la DB
      sBd.getRange(rowBd,44,1,1).setValue(urlSlide);  
      sBd.getRange(rowBd,45,1,1).setValue(urlPdf);

      //envio mail con el archivo creado
      
      var alertEmail = "felipemancano@growgroup.us";

      GmailApp.sendEmail(comercialEmail,"New proposal generated", "Hello!\n\nEverything went excellent, attached you have your proposal generated in PDF format ready to send.\nYou can also see in this link,   the editable document: " + urlSlide,{bcc: "cesarantunes@growgroup.us", attachments: [pdfFile.getAs(MimeType.PDF)], name: "Grow Group Automation"});

      if(cancellationFeePrev != 50 || cancellationFeePrevB != 50 || cancellationFeePrevC != 50 || cancellationFeeAfter != 100 || cancellationFeeAfterB != 100 || cancellationFeeAfterC != 100 || scalability1 != 7 || scalability1B != 7 || scalability1C != 7 || scalabilityDiscount1 != 10 || scalabilityDiscount1B != 10 || scalabilityDiscount1C != 10 || scalability2 != 15 || scalability2B != 15 || scalability2C != 15 || scalabilityDiscount2 != 15 || scalabilityDiscount2B != 15 || scalabilityDiscount2C != 15 || dueDays != 15 || dueDaysB != 15 || dueDaysC != 15 || timingResponse != 24 || timingResponseB != 24 || timingResponseC != 24 || timingExecute != 48 || timingExecuteB != 48 || timingExecuteC != 48 || exclusivityDays != 21 || exclusivityDaysB != 21 || exclusivityDaysC != 21)  {
      GmailApp.sendEmail(alertEmail, "Proposal alert, values out of default", "Hello\n\nBU: " + bu + " generated a proposal with some values different from the default ones, you can review the  document in the following link " + urlSlide + "\n\n"+
      "cancellationFeePrev: "+cancellationFeePrev+"\n"+
      "cancellationFeePrevB: "+cancellationFeePrevB+"\n"+
      "cancellationFeePrevC: "+cancellationFeePrevC+"\n"+
      "cancellationFeeAfter: "+cancellationFeeAfter+"\n"+
      "cancellationFeeAfterB: "+cancellationFeeAfterB+"\n"+
      "cancellationFeeAfterC: "+cancellationFeeAfterC+"\n\n"+
      "scalability1: "+scalability1+"\n"+
      "scalability1B: "+scalability1B+"\n"+
      "scalability1C: "+scalability1C+"\n"+
      "scalabilityDiscount1: "+scalabilityDiscount1+"\n"+
      "scalabilityDiscount1B: "+scalabilityDiscount1B+"\n"+
      "scalabilityDiscount1C: "+scalabilityDiscount1C+"\n"+
      "scalability2: "+scalability2+"\n"+
      "scalability2B: "+scalability2B+"\n"+
      "scalability2C: "+scalability2C+"\n"+
      "scalabilityDiscount2: "+scalabilityDiscount2+"\n"+
      "scalabilityDiscount2B: "+scalabilityDiscount2B+"\n"+
      "scalabilityDiscount2C: "+scalabilityDiscount2C+"\n"+
      "timingResponse: "+timingResponse+"\n"+
      "timingResponseB: "+timingResponseB+"\n"+
      "timingResponseC: "+timingResponseC+"\n"+
      "timingExecute: "+timingExecute+"\n"+
      "timingExecuteB: "+timingExecuteB+"\n"+
      "timingExecuteC: "+timingExecuteC+"\n"+
      "exclusivityDays: "+exclusivityDays+"\n"+
      "exclusivityDaysB: "+exclusivityDaysB+"\n"+
      "exclusivityDaysC: "+exclusivityDaysC+"\n",
      {cc: "cesarantunes@growgroup.us", attachments: [pdfFile.getAs(MimeType.PDF)], name: "Grow Group Automation"});
      }

      var nextRowBD = rowBd + qtyJob;
      ssDb.getSheetByName('validation').getRange("N2").setValue(nextRowBD);

      Logger.log("NextRowBD:"+nextRowBD);
      
    }


    
  }
  catch(err){
    Logger.log(err);
    GmailApp.sendEmail(comercialEmail,"Error in generating your proposal", "Hello!\n\nSomething went wrong when generating your proposal, you will shortly be contacted by the IT area to be able to solve it soon!\n\nError: "+err,{bcc: "cesarantunes@growgroup.us", name: "Grow Group Automation"});
  }
}

/* +++ funciones para convertir la forma de mostrar el importe segun dolares o pesos */
function convertUsd(monto) {
  var long = monto.toString().length;
  monto.toString();

  /*
  if(long == 4){
    var dd = monto.toString().substring(0,1) + "," + monto.toString().substring(1) + ".00";
  }

  else if(long == 5){
    var dd = monto.toString().substring(0,2) + "," + monto.toString().substring(1) + ".00";
  }
  */
  var dd = monto.toString() + ".00";

  return dd;

}

function convertPeso(monto) {
  var long = monto.toString().length;
  monto.toString();

  /*
  if(long == 4){
    var dd = monto.toString().substring(0,1) + "." + monto.toString().substring(1) + ",00";
  }

  else if(long == 5){
    var dd = monto.toString().substring(0,2) + "." + monto.toString().substring(1) + ",00";
  }
  */
  var dd = monto.toString() + ",00";

  return dd;

}
