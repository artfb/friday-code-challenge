import React from 'react';
import { queryClient, VehiclesContext } from '../App';
import { useVehiclesModels } from '../hooks/useVehicles';
import { StyledBackButton, StyledCard, StyledGrid } from './Styled';

export const Models = () => {
  const { state: { make }, setState } = React.useContext(VehiclesContext)
  const { data, error, isFetching } = useVehiclesModels(make);

  const goBack = () => {
    setState(s => ({
      ...s,
      make: '',
      model: ''
    }))
  }

  const onSelect = (model) => () => {
    setState(s => ({
      ...s,
      model
    }))
  }

  return <>
    <StyledBackButton type="button" onClick={goBack}>Back</StyledBackButton>
    <h3>{make}</h3>

    {error && <button onClick={() => queryClient.refetchQueries(['models', make])}>refetch</button>}

    {isFetching ? 'loading...' : <StyledGrid>
      {!!data.length ? data.map(m => (
        <StyledCard key={m} onClick={onSelect(m)}>{m}</StyledCard>
      )) : 'No entries, sorry!'}
    </StyledGrid>}
  </>
}
