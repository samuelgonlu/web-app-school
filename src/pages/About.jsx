import React from 'react';

const About = () => {
    return (
        <div className='main_container limit-div'>
            <div className='titulo-head'>
                <div className='subtitle'>
                    <h1 className='mb-5'>About Us</h1>
                </div>
            </div>
            <div>
            <div class="card-group">
                <div class="card">
                    <img class="card-img-top" src="https://ii.ct-stc.com/2/logos/empresas/2017/02/28/scio-consulting-sc-B6A99E5170EAF38E152336thumbnail.jpeg" alt="Card image cap"/>
                    <div class="card-body">
                        <h5 class="card-title">Made by scio</h5>
                        <p class="card-text">This app was made by scio company, in apprentice process</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Last updated 29/04/2022</small>
                    </div>
                </div>
                <div class="card">
                    <img class="card-img-top" src="https://www.imagar.com/wp-content/uploads/2019/10/queesunapi.png" alt="Card image cap"/>
                    <div class="card-body">
                        <h5 class="card-title">What is</h5>
                        <p class="card-text">This is a WEB application, which manages courses, through an API and a Database</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Last updated 29/04/2022</small>
                    </div>
                </div>
                <div class="card">
                    <img class="card-img-top" src="https://ozenero.com/wp-content/uploads/2019/01/react-redux-http-client-nodejs-restapi-express-mongoose-mongodb-feature-image.png" alt="Card image cap"/>
                    <div class="card-body">
                        <h5 class="card-title">Used technologies</h5>
                        <p class="card-text">The following technologies were used: MongoDB, React, NodeJs</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Last updated 29/04/2022</small>
                    </div>
                </div>
            </div>
          
            </div>
        </div>
    );
};

export default About;