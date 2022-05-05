import styled from 'styled-components';
import search_img_1 from './search_bg_img_1.png'
import search_landing_text from './search_landing_text.svg'
import search_subtitle from './search_subtitle.svg'

const BannerContainer = styled.div`
  margin: auto;
  outline: 1px solid #000;
  width: 1280px;
  height: 536px;
  min-width: 1280px;
  min-height: 536px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SearchBgImageContainer = styled.div`
  width: 1226px;
  height: 490.6px;
  min-width: 1226px;
  min-height: 490.6px;
  background-image: url(${search_img_1});
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  flex-direction: column;
`

const SearchLandingTextContainer = styled.div`
  width: 486px;
  height: 70px;
  min-width: 486px;
  min-height: 70px;
  top: 160px;
  left: 367px;
  background-image: url(${search_landing_text});
  background-repeat: no-repeat;
  position: absolute;
`

const SearchSubtitle = styled.div`
  width: 280px;
  height: 21px;
  min-width: 280px;
  min-height: 21px;
  top: 239px;
  left: 367px;
  position: absolute;
  background-image: url(${search_subtitle});
  background-repeat: no-repeat;
`

const SearchInputGroupContainer = styled.div`
  outline: solid 1px #fff;
  width: 492px;
  height: 88px;
  min-width: 492px;
  min-height: 88px;
  top: 269px;
  left: 367px;
  position: absolute;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const SearchInputText = styled.div`
  outline: solid 1px #fff;
  display: flex;
  width: 492px;
  height: 40px;
`

const SearchCategorySelection = styled.div`
  outline: solid 1px #fff;
  display: flex;
  width: 219px;
  height: 40px;
  margin-top: 8px;
`

const SearchCitySelection = styled.div`
  outline: solid 1px #fff;
  display: flex;
  width: 219px;
  height: 40px;
  margin-top: 8px;
  margin-left: 6px;
`

const SearchButton = styled.div`
  outline: solid 1px #fff;
  display: flex;
  width: 40px;
  height: 40px;
  margin-top: 8px;
  margin-left: 8px;
`


export const SearchBanner = () => (
  <BannerContainer>
    <SearchBgImageContainer>
      <SearchLandingTextContainer>
      </SearchLandingTextContainer>
      <SearchSubtitle />
      <SearchInputGroupContainer>
        <SearchInputText />
        <SearchCategorySelection />
        <SearchCitySelection />
        <SearchButton />
      </SearchInputGroupContainer>
    </SearchBgImageContainer>
  </BannerContainer>
)
