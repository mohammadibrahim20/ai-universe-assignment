// load Api Data
const loadData=(dataIsConnect)=>{
    url = 'https://openapi.programming-hero.com/api/ai/tools'
    fetch(url)
    .then(res=> res.json())
    .then(data=> {
      // sortIsConnected(data)
      const data2 = data.data.tools;
      
      
      // console.log(data3)
      if(dataIsConnect){
      showCardData(data2.slice(0,6))
      newCard(data2)
      // console.log(data2)
      }
      else{
      
      const data3 = data.data.tools.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
      showCardData(data3.slice(0,6))
      newCard(data3)
      }
      
  
    })
    .catch(error=> console.log('Error fetching data:', error))
    
}
// sort btn connected
document.getElementById('sort').addEventListener('click', function(){
  console.log('hi')
  loadData(false)
  const btn = document.getElementById('btn-container')
  btn.classList.remove('d-none')
})


// show Card date
const showCardData = (data)=>{
  showSpinner(true);
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = '';
    // data.slice(0,6).forEach(singleData=>{
      data.forEach(singleData=>{
        const {image, name, features, id}= singleData;
        // console.log(features)
    
       
        // console.log(singleData)
        cardContainer.innerHTML+=`

        <div class="col">
                  <div class="card h-100">
                    <div class="p-3" >
                        <img class="img-fluid rounded d-block" src="${image}"  alt="...">
                    </div>
                    <div class="card-body me-0">
                      <h5 class="card-title">Features</h5>
                      <ol id="feuter-li" style="list-style-type: none;">
                        <li>1. ${features[0]}</li>
                        <li>2. ${features[1]}</li>
                        <li>${features[2]?'3. '+features[2]: '' }</li>
                        <li">${features[3]?'4. '+ features[3]:'' }</li>
                      </ol>
                      
                    </div>
                    <hr class="mx-3">
                    <div class="px-3 d-flex justify-content-between align-items-center">
                    
                        <div>
                            <h5 class="card-title"> ${name}</h5>
                            <p><i class="fa-solid fa-calendar-days"></i> <span>${singleData.published_in}</span></p>
                        </div>
                        <div onclick="modalShow('${id}')" class="btn " data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <i class="fa-sharp fa-solid fa-arrow-right rounded-circle bg-danger-subtle p-2"></i>
                        </div>
                    </div>
                  </div>
                </div>
        `;
        
      })
      
   
      
      showSpinner(false)
    
}
// show All Card
const showAllCardData = (data)=>{
  showSpinner(true);
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML= '';
    // data.slice(0,6).forEach(singleData=>{
      data.forEach(singleData=>{
        const {image, name, features, id}= singleData;
        // console.log(features)
    

        // console.log(singleData)
        cardContainer.innerHTML+=`

        <div class="col">
                  <div class="card h-100">
                    <div class="p-3" >
                        <img class="img-fluid rounded d-block" src="${image}"  alt="...">
                    </div>
                    <div class="card-body me-0">
                      <h5 class="card-title">Features</h5>
                      <ol id="feuter-li" style="list-style-type: none;">
                        <li>1. ${features[0]}</li>
                        <li>2. ${features[1]}</li>
                        <li>${features[2]?'3. '+features[2]: '' }</li>
                        <li">${features[3]?'4. '+ features[3]:'' }</li>
                      </ol>
                      
                    </div>
                    <hr class="mx-3">
                    <div class="px-3 d-flex justify-content-between align-items-center">
                    
                        <div>
                            <h5 class="card-title"> ${name}</h5>
                            <p><i class="fa-solid fa-calendar-days"></i> <span>${singleData.published_in}</span></p>
                        </div>
                        <div onclick="modalShow('${id}')" class="btn " data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <i class="fa-sharp fa-solid fa-arrow-right rounded-circle bg-danger-subtle p-2"></i>
                        </div>
                    </div>
                  </div>
                </div>
        `;
        
      })
      
   
      
      showSpinner(false)
    
}
const newCard = data=>{
  document.getElementById('show-data').addEventListener('click', function(){
    const btn = document.getElementById('btn-container');
    showAllCardData(data)
    btn.classList.add('d-none')
  })
  
}

// modal
const modalShow = (id)=>{

  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  fetch(url)
  .then(res=> res.json())
  .then(data=> showAiDetails(data.data))
  // console.log(url)
}

const showAiDetails = (data)=>{
  const {description, features, pricing, integrations, accuracy, image_link, input_output_examples}= data;
  const modalBody = document.getElementById('modal-body');
  

  modalBody.innerHTML=`
  <div class="row">
  <div class="col-sm-6 mb-3 mb-sm-0">
      <div class="card h-100">
          <div class="card-body  bg-danger bg-opacity-10 border-danger border rounded">
              <h5 class="card-title">${description}
              </h5>

              <div>
                  <div class="row row-cols-3 g-2">
                      <div class="col">
                          <div class="card border-0 h-100">
                              <div class="card-body">
                                  <h5 class="card-title text-success text-center fs-6 mx-1">${pricing[0].price ? pricing[0].price.split("/").join('/ '): ' '} ${pricing[0].plan}</h5>
                              </div>
                          </div>
                      </div>
                      <div class="col">
                          <div class="card border-0 h-100">
                              <div class="card-body">
                                  <h5 class="card-title text-warning text-center fs-6">${pricing[1].price ? pricing[1].price.split("/").join('/ ') : ' '  } ${pricing[1].plan}
                                  </h5>
                              </div>
                          </div>
                      </div>
                      <div class="col">
                          <div class="card border-0 h-100">
                              <div class="card-body text-danger px-0">
                                  <h5 class="card-title text-center fs-6 px-0">${pricing[2].price} <small>${pricing[2].plan} </small></h5>
                              </div>
                          </div>
                      </div>

                  </div>
              </div>

              <div class="mt-3">
                  <div class="row row-cols-2 g-3">
                      <div class="col">
                          <h5 class="card-title">Features</h5>
                          <ul id="featureList" class=" mx-0 px-0">
                             
                          </ul>
                      </div>
                      <div class="col">
                          <h5 class="card-title">Integrations</h5>
                          <ul id="li-inter" class="px-0 mx-0 ">
                              
                          </ul>
                      </div>

                  </div>

              </div>

          </div>

      </div>
  </div>

  <div class="col-sm-6">
      <div class="card h-100">
          <div class="position-relative">
              <div id="new" class="position-absolute m-4 top-0 end-0 bg-danger px-2 text-white rounded">
                  ${accuracy.score ? accuracy.score +'% accuracy' : ''}
              </div>
              <img src="${image_link[0]?image_link[0]: image_link[1] }" class="card-img-top px-3 img-fluid pt-3 rounded"
                  alt="...">
          </div>
          <div class="card-body">
              <h5 class="card-title text-center"> ${input_output_examples[0].input}</h5>
              <p class="card-text text-center">${input_output_examples[0].output}</p>

          </div>
      </div>
  </div>
</div>
  `
  const liIntegrations = document.getElementById('li-inter');
  // console.log(liIntegrations)
  integrations.forEach(li =>{

    liIntegrations.innerHTML += `<li class="ms-2"><small> ${li? li: 'No data Found'}</small></li>`

  });
  const featureNames = Object.values(features).map((feature) => feature.feature_name);


  const listContainer = document.getElementById("featureList");
  featureNames.forEach(li =>{
    listContainer.innerHTML+= `<li class="ms-2"><small>${li}<small> </li>`
  }) ;
  
}


// spinner loader show
const showSpinner=(isLoading)=>{
  const looder = document.getElementById('loader');
  if(isLoading){
    looder.classList.remove('d-none')
  }
  else{
    looder.classList.add('d-none')

  }
}
// const forAllData = data=>{
// }

loadData(true);