import styled from 'styled-components';
import search_img_1 from './search_bg_img_1.png'
import search_landing_text from './search_landing_text.svg'
import search_subtitle from './search_subtitle.svg'

import { px2Rem } from '@utils/StyleConverter'

const BannerContainer = styled.div`
  width: ${px2Rem(1280)};
  height: ${px2Rem(536)};
  min-width: ${px2Rem(1280)};
  min-height: ${px2Rem(536)};
`

const SearchBgImageContainer = styled.div`
  width: ${px2Rem(1226)};
  height: ${px2Rem(490.6)};
  min-width: ${px2Rem(1226)};
  min-height: ${px2Rem(490.6)};
  background-image: url(${search_img_1});
`

const SearchLandingTextContainer = styled.div`
  width: ${px2Rem(486)};
  height: ${px2Rem(70)};
  min-width: ${px2Rem(486)};
  min-height: ${px2Rem(70)};
  top: ${px2Rem(160)};
  left: ${px2Rem(367)};
  background-image: url(${search_landing_text});
`

const SearchSubtitle = styled.div`
  width: ${px2Rem(280)};
  height: ${px2Rem(21)};
  min-width: ${px2Rem(280)};
  min-height: ${px2Rem(21)};
  top: ${px2Rem(239)};
  left: ${px2Rem(367)};
  background-image: url(${search_subtitle});
`

const SearchInputGroupContainer = styled.div`
  width: ${px2Rem(492)};
  height: ${px2Rem(88)};
  min-width: ${px2Rem(492)};
  min-height: ${px2Rem(88)};
  top: ${px2Rem(269)};
  left: ${px2Rem(367)};
`

const SearchInputText = styled.div`
  width: ${px2Rem(492)};
  height: ${px2Rem(40)};
`

const SearchCategorySelection = styled.div`
  width: ${px2Rem(219)};
  height: ${px2Rem(40)};
  margin-top: ${px2Rem(8)};
`

const SearchCitySelection = styled.div`
  width: ${px2Rem(219)};
  height: ${px2Rem(40)};
  margin-top: ${px2Rem(8)};
  margin-left: ${px2Rem(6)};
`


const SearchButton = styled.div`
  width: ${px2Rem(40)};
  height: ${px2Rem(40)};
  margin-top: ${px2Rem(8)};
  margin-left: ${px2Rem(8)};
`


export const SearchBanner = () => (
  <BannerContainer className='outline-show flex items-center justify-center m-auto'>
    <SearchBgImageContainer className='flex flex-col absolute bg-no-repeat' >
      <SearchLandingTextContainer className='outline-show flex absolute bg-no-repeat	' />
      <SearchSubtitle className='absolute bg-no-repeat	' />
      <SearchInputGroupContainer className='outline-show flex flex-row flex-wrap absolute '>
        <SearchInputText className='outline-show flex' />
        <SearchCategorySelection className='outline-show flex' />
        <SearchCitySelection className='outline-show flex' />
        <SearchButton className='outline-show flex' />
      </SearchInputGroupContainer>
    </SearchBgImageContainer>
  </BannerContainer >
)
