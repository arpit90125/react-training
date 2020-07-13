async function downloadData() {
const res = await fetch('ifsc.json');
 window.ifscData = await res.json();
 return window.ifscData;
}


const bankState = {};

async function calculateUniqueBankList() {
    const fullBankList = await ifscData.map(
        function(item){
            return item.BANK;
        })
    const bankSet = new Set(fullBankList);

    bankState.uniqueBankList = Array.from(bankSet);
}


async function fillBankListIntoSelect() {
    await downloadData();
    await calculateUniqueBankList();
    const bankSelect = document.getElementById('Bank')
    bankState.uniqueBankList.forEach(function (element) {
    const newOption = document.createElement("OPTION");
    newOption.text = element;
    newOption.value = element;
    bankSelect.add(newOption)
    })
   }

   function calculateUniqueStateList(bank) {
       const stateName = filterListByBank(bank);
    const fullStateList = stateName.map(
        function(item){
            return item.STATE;
        })
    const stateSet = new Set(fullStateList);
    bankState.uniqueStateList = Array.from(stateSet);
}

   function fillStateListIntoSelect() {
       let bank = document.getElementById("Bank");
        if(bank.value !== "0"){
            bank.disabled = true;
            calculateUniqueStateList(bank.value);
            const stateSelect = document.getElementById('State')
            bankState.uniqueStateList.forEach(function (element) {
            const newOption = document.createElement("OPTION");
            newOption.text = element;
            newOption.value = element;
            stateSelect.add(newOption);
        })}
   }

   function calculateUniqueDistrictList(bank,state) {
    const districtName = filterListByBankAndState(bank,state);
    const fullDistrictList = districtName.map(
     function(item){
         return item.DISTRICT;
     })
 const districtSet = new Set(fullDistrictList);
 bankState.uniqueDistrictList = Array.from(districtSet);
}

function fillDistrictListIntoSelect() {
    let state = document.getElementById("State");
     if(state.value !== "0"){
        state.disabled = true; 
        let bank = document.getElementById("Bank").value;
         calculateUniqueDistrictList(bank,state.value);
         const districtSelect = document.getElementById('District')
         bankState.uniqueDistrictList.forEach(function (element) {
         const newOption = document.createElement("OPTION");
         newOption.text = element;
         newOption.value = element;
         districtSelect.add(newOption);
     })}
}


function calculateUniqueBranchList(bank,state,district) {
    const branchName = filterListByBankAndStateAndDistrict(bank,state,district);
    const fullBranchList = branchName.map(
     function(item){
         return item.BRANCH;
     })
 const branchSet = new Set(fullBranchList);
 bankState.uniqueBranchList = Array.from(branchSet);
}

function fillBranchListIntoSelect() {
    let district = document.getElementById("District");
    const branchSelect = document.getElementById('Branch');
     if(district.value !== "0"){
        district.disabled = true;
         let bank = document.getElementById("Bank").value;
         let state = document.getElementById("State").value;
         calculateUniqueBranchList(bank,state,district.value);
         bankState.uniqueBranchList.forEach(function (element) {
         const newOption = document.createElement("OPTION");
         newOption.text = element;
         newOption.value = element;
         branchSelect.add(newOption);
     })}
}

function details()
{
    document.getElementById("formFill").style.display = "none";
    document.getElementById("output").style.display = "block";
    let bank = document.getElementById("Bank").value;
    let state = document.getElementById("State").value;
    let district = document.getElementById("District").value;
    let branch = document.getElementById("Branch");
    branch.disabled = true;
    let accountDetails = filterListByBankAndStateAndDistrictAndBranch(bank, state,district , branch.value);
    
    const detailFill = document.getElementById("innerOutput")
    Object.keys(accountDetails[0]).forEach((item)=>{console.log(item + " : " + accountDetails[0][item]);
    const outputRow = document.createElement("p");
    outputRow.innerText = item + " : " + accountDetails[0][item];
    detailFill.appendChild(outputRow);
    })
}

function filterListByBank(bank) {
    return ifscData.filter(function(item) {
     return item.BANK === bank;
     })
    }
function filterListByBankAndState(bank, state) {
    return ifscData.filter(function(item) {
     return item.BANK === bank && item.STATE === state;
     })
    }
function filterListByBankAndStateAndDistrict(bank, state,district) {
        return ifscData.filter(function(item) {
         return item.BANK === bank && item.STATE === state && item.DISTRICT === district;
         })
        }
    
 function filterListByBankAndStateAndDistrictAndBranch(bank, state,district , branch) {
    return ifscData.filter(function(item) {
    return item.BANK === bank && item.STATE === state && item.DISTRICT === district && item.BRANCH === branch;
    })
    }

  fillBankListIntoSelect(); 
