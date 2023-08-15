import styled from 'styled-components';

export const ReactAppStyled = styled.div`
  .pl-3 {
    padding-left: 1rem !important;
  }
  .pr-3 {
    padding-right: 1rem !important;
  }
  .pt-3 {
    padding-top: 1rem !important;
  }
  .pb-2 {
    padding-bottom: .5rem !important;
  }

  .p-2{
      padding: 20px !important;
  }
  .weight-7 {
    font-weight: 700;
  }

  .text-secondary {
    color: #5f6d88 !important;
  }
  .text-white {
    color: white !important;
  }
  
  .orange {
    color: # !important;
  }

  ::-webkit-scrollbar {
    width: 8px;
    background-color: #E6E6E6;
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: #9E9E9E;
    border-radius: 8px;
  }
  
  /* Apply the styles to the specific component */
  .awesome-scrollbar {
    max-height: 100vh;
    overflow-y: scroll;
    scrollbar-color: #9E9E9E red;
    scrollbar-width: thin;
  }
`;