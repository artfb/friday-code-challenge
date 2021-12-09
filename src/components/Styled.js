import styled from '@emotion/styled';

export const StyledLayout = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '80vw',
  margin: '0 auto'
});

export const StyledGrid = styled.div(
  {
    display: 'grid',
    columnGap: 20,
    rowGap: 10,
    width: '100%',
  },
  props => ({
    gridTemplateColumns: props.single ? '1fr' : '1fr 1fr',

    '@media(min-width: 620px)': {
      gridTemplateColumns: props.single ? '1fr' : '1fr 1fr 1fr',
    }
  })
);

export const StyledCard = styled.div({
  cursor: 'pointer',
  display: 'flex',
  border: '1px solid black',
  background: '#fff',
  color: '#111',
  paddingTop: 30,
  paddingBottom: 30,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8
});

export const StyledInput = styled.input({
  width: '100%',
  border: 'none',
  background: 'transparent',
  borderBottom: '2px solid #ddd',
  height: 40,
  fontSize: 20,
  color: '#fff',
  outline: 'none',
  marginBottom: 20
});

export const StyledBackButton = styled.button({
  background: '#fcf',
  color: '#1a1a1a',
  border: 'none',
  padding: '5px 20px',
})

export const StyledVehicleDetails = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  paddingLeft: 20,
  paddingRight: 20
})


export const StyledFiltersLayout= styled.div({
  '@media(min-width: 768px)': {
    display: 'grid',
    gridTemplateColumns: '35% 65%',
    width: '100%',
    columnGap: 20
  },
  '@media(min-width: 1080px)': {
    display: 'grid',
    gridTemplateColumns: '25% 75%',
    width: '100%',
    columnGap: 20
  },
})

export const StyledFilters= styled.div({
  display: 'flex',
  flexDirection: 'column',
})

export const StyledVehicles= styled.div({

})

export const StyledVehiclesPagination= styled.div({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 20,
  marginBottom: 20,
  flexDirection: 'column',
  alignItems: 'center',
  lineHeight: '2em'
})
