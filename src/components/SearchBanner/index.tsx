import styled from 'styled-components';
import search_img_1 from './search_bg_img_1.png'
import search_landing_text from './search_landing_text.svg'
import search_subtitle from './search_subtitle.svg'

const BannerContainer = styled.div`
  width: 1280px;
  height: 536px;
  min-width: 1280px;
  min-height: 536px;
`

const SearchBgImageContainer = styled.div`
  width: 1226px;
  height: 490.6px;
  min-width: 1226px;
  min-height: 490.6px;
  background-image: url(${search_img_1});
`

const SearchLandingTextContainer = styled.div`
  width: 486px;
  height: 70px;
  min-width: 486px;
  min-height: 70px;
  top: 160px;
  left: 367px;
  background-image: url(${search_landing_text});
`

const SearchSubtitle = styled.div`
  width: 280px;
  height: 21px;
  min-width: 280px;
  min-height: 21px;
  top: 239px;
  left: 367px;
  background-image: url(${search_subtitle});
`

const SearchInputGroupContainer = styled.div`
  width: 492px;
  height: 88px;
  min-width: 492px;
  min-height: 88px;
  top: 269px;
  left: 367px;
`

const SearchInputText = styled.div`
  width: 492px;
  height: 40px;
`

const SearchCategorySelection = styled.div`
  width: 219px;
  height: 40px;
  margin-top: 8px;
`

const SearchCitySelection = styled.div`
  width: 219px;
  height: 40px;
  margin-top: 8px;
  margin-left: 6px;
`


const SearchButton = styled.button`
  width: 40px;
  height: 40px;
  margin-top: 8px;
  margin-left: 8px;
`


export const SearchBanner = () => (
  <BannerContainer className='outline-show flex items-center justify-center m-auto'>
    <SearchBgImageContainer className='flex flex-col absolute bg-no-repeat	'>
      <SearchLandingTextContainer className='outline-show flex absolute bg-no-repeat	' />
      <SearchSubtitle className='absolute bg-no-repeat	' />
      <SearchInputGroupContainer className='outline-show flex flex-row flex-wrap absolute '>
        <SearchInputText className='outline-show flex' />
        <SearchCategorySelection className='outline-show flex' />
        <SearchCitySelection className='outline-show flex' />
        <SearchButton className='outline-show flex' />
      </SearchInputGroupContainer>
    </SearchBgImageContainer>
  </BannerContainer>
)
