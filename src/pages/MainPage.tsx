import React, { useEffect } from "react"
import MainBannerContainer from "@components/MainBannerContainer";
import MainBanner from "@components/MainBanner";
import Header from '@components/Header'
import MainContainer from '@components/MainContainer'
import SponserInfo from "@components/SponserInfo";
import ScheduleTask from "@components/ScheduleTask"
import TaskCard from "@components/TaskCard"

import { TaskType, Tasks } from "@components/TaskCard/constants"


function MainPage() {
  return (
    <>
      <MainBannerContainer>
        <Header />
        <MainBanner className={`mx-auto mt-[39px]`} />
      </MainBannerContainer>
      <MainContainer>
        <SponserInfo />
        <ScheduleTask>
          {
            Tasks.map(({ title, subtitle, content, tipUrl, contributeUrl}: TaskType, index: number) => {
              const props = {
                title: title,
                subtitle: subtitle,
                content: content, 
                EnterpriseLogo: <></>,
                TaskLogo: <></>,
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
      </MainContainer>
    </>
  );
}

export default MainPage;
