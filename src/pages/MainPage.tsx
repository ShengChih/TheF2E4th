import React from "react"
import MainBannerContainer from "@components/MainBannerContainer";
import MainBanner from "@components/MainBanner";
import Header from '@components/Header'
import MainContainer from '@components/MainContainer'
import HostInfo from "@components/HostInfo";
import ScheduleTask from "@components/ScheduleTask"
import TaskCard from "@components/TaskCard"
import ScheduleInfo from "@components/ScheduleInfo"
import AwardInfo from "@components/AwardInfo"
import LiveShareVideo from "@components/LiveShareVideo"
import SponerInfo from "@components/SponerInfo"
import Footer from "@components/Footer";

import { TaskType, Tasks } from "@components/TaskCard/constants"


function MainPage() {
  return (
    <>
      <MainBannerContainer>
        <Header />
        <MainBanner className={`mx-auto mt-[39px]`} />
      </MainBannerContainer>
      <MainContainer>
        <HostInfo />
        <ScheduleTask>
          {
            Tasks.map(({
              title, subtitle, content, tipUrl, contributeUrl,
              TaskLogo,
              EnterpriseLogo
            }: TaskType, index: number) => {
              const props = {
                title: title,
                subtitle: subtitle,
                content: content, 
                EnterpriseLogo: EnterpriseLogo,
                TaskLogo: TaskLogo,
                forwardTips: () => {
                  window.open(tipUrl, "_blank")
                },
                forwardContribute: () => {
                  window.open(contributeUrl, "_blank")
                }
              }
              return <TaskCard {...props} key={`task-grid-${index}`} />
            })
          }
        </ScheduleTask>
        <ScheduleInfo></ScheduleInfo>
        <AwardInfo></AwardInfo>
        <LiveShareVideo></LiveShareVideo>
        <SponerInfo></SponerInfo>
        <Footer></Footer>
      </MainContainer>
    </>
  );
}

export default MainPage;
