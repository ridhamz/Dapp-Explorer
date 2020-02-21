import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        blocNumber : 0,
        difficulty :0,
        gasPrice :0,
        latestBlock :[]
    }
  }

 async componentWillMount(){
   //load web3
    let web3 = new Web3('https://mainnet.infura.io/v3/3a22e5709d134c38b3d7153b00c2b3ad');
    //fetch latest block
    let LatestBlock = await web3.eth.getBlock('latest');
   // set the state
      this.setState({
        blocNumber : LatestBlock.number,
        difficulty : LatestBlock.difficulty
      })
      //fetch the gas price 
      let gasPrice = await web3.eth.getGasPrice();
      // set the state
      this.setState({gasPrice:gasPrice})

      //fetch latests 10 blocks 
      let block 
      let latestblock = []
      for(let i = 0; i< 10; i++){
        block = await web3.eth.getBlock(LatestBlock.number - i);
        latestblock.push(block)
      }
      // set state
      this.setState({latestBlock : latestblock})
  }
  render() {
    return (
      <div >
        <nav className="navbar navbar-dark fixed-top bg-white flex-md-nowrap p-2 shadow">
        <div className="container">
          <a>
            Dapp Explorer
          </a>
          </div>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto " style={{width:'800px'}}>
                <h5>Ethereum Blockchain Explorer</h5>
                <div className="row">
                   <div className="col-4">
                       <div className="bg-light pt-4 pb-3 m-1" >
                        <h5>Latest Block</h5>
                          <p>{this.state.blocNumber}</p>
                         </div>
                       </div>

                        <div className="col-4">
                       <div className="bg-light pt-4 pb-3 m-1" >
                        <h5>Diffuculty</h5>
                         <p>{this.state.difficulty}</p>
                         </div>
                       </div>

                        <div className="col-4">
                       <div className="bg-light pt-4 pb-3 m-1" >
                        <h5>Gas Price</h5>
                          <p>{this.state.gasPrice}</p>
                         </div>
                       </div>
                   </div>

                   <div className="row">
                   <div className="col-lg-12 mt-3">
                       <div className="card" >
                       <div className="card-header">
                        <h5>Latests 10 Block</h5>
                        </div>
                          <div className="card-body">
                           <table className="table">
                            <body>
                            <center>
                             <tr>
                              <th scope="col">#</th>
                              <th scope="col">Hash</th>
                              <th scope="col">Miner</th>
                              <th scope="col">Timestamp</th>
                             </tr>
                              {
                                this.state.latestBlock.map((block,key)=>{
                                  return(
                                    <tr key={key}>
                                      <td>{block.number} </td>
                                       <td>{block.hash.substring(0,20)}...</td>
                                       <td>{block.miner.substring(0,20)}...</td>
                                       <td>{block.timestamp}</td>
                                    </tr>
                                  )
                                })
                              }
                              </center>
                            </body>
                           </table>
                          </div>
                         </div>
                       </div>
                   </div>
                </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
