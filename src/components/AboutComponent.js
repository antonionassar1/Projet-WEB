import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';

const RenderLeader = ({leader}) => {

  return(
    <Media>
      <Media left className="mt-3">
        <Media object src={leader.image} alt={leader.name}/>
      </Media>
      <Media body className="ml-5 mt-3">
        <Media heading>{leader.name}</Media>
        <p>{leader.designation}</p>
        <p>{leader.description}</p>
      </Media>
    </Media>
  )
}

function About(props) {

    const leaders = props.leaders.map((leader) => {
        return (
          <RenderLeader key={leader.id} leader={leader} />
        );
    });

    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>Started in 2021, Chou bedak was established in order to let people easily satisfy their needs through our website. With its structure and organization, chou bedak offers an easy way to navigate and quickly find the desired item in a manner that can be found nowhere else.</p>
                   
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">3 Feb. 2021</dd>
                                <dt className="col-6">Major Stake Holder</dt>
                                <dd className="col-6">Chou Badak Inc.</dd>
                                <dt className="col-6">Last Year's Turnover</dt>
                                <dd className="col-6">$0</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">3</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">“Customer service shouldn’t just be a department, it should be the entire company”</p>
                                <footer className="blockquote-footer">Tony Hsieh,
                                <cite title="Source Title">CEO of Zappos</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Corporate Leadership</h2>
                </div>
                <div className="col-12">
                    <Media list>
                        {leaders}
                    </Media>
                </div>
            </div>
        </div>
    );
}

export default About; 