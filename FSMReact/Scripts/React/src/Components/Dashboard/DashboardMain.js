import React from 'react'

// import Images from '../Images';
import './DashboardMain.css';
import DashboardVisitTab from './DashboardVisitTab';

export default function DashboardMain() {
  return (
    <section className="content-wraper">
      <div className="dashboardHighlightWrap">
        <div className="breadCumb">
            <span>Dashboard</span>
        </div>

        <div className="container">
          <svg className="hidden">
            <defs>
              <path id="tabshape" d="M80,60C34,53.5,64.417,0,0,0v60H80z" />
            </defs>
          </svg>
          <section className="">
            <div className="tabs tabs-style-shape">
              <nav>
                <ul role="tablist" className="tabItemsLI">

                  <li role="presentation" id="tbsalesman" className="active" data-toggle="tooltip" 
                  title="Get the Details of Total Employee, working or on leave and if anyone not using the app" data-placement="top">
                    <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">
                      <svg viewBox="0 0 80 60" preserveAspectRatio="none"><use xlinkHref="#tabshape"></use></svg>
                      <svg viewBox="0 0 80 60" preserveAspectRatio="none"><use xlinkHref="#tabshape"></use></svg>
                      <span>Visit</span>
                    </a>
                  </li>

                  <li role="presentation" id="tbFieldVisit" className="" data-toggle="tooltip" 
                  title="Get the Details of Total Employee, working or on leave and if anyone not using the app" data-placement="top">
                    <a href="#FieldVisit" aria-controls="FieldVisit" role="tab" data-toggle="tab">
                      <svg viewBox="0 0 80 60" preserveAspectRatio="none"><use xlinkHref="#tabshape"></use></svg>
                      <svg viewBox="0 0 80 60" preserveAspectRatio="none"><use xlinkHref="#tabshape"></use></svg>
                      <span>Field  Visit</span>
                    </a>
                  </li>

                </ul>
              </nav>

              <div className="tab-content mainAreaTAb">
                <div role="tabpanel" className="tab-pane active" id="profile">

                  <DashboardVisitTab />
                  

                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
