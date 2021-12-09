import React from 'react';
import { useQuery } from 'react-query';
import { queryClient, VehiclesContext } from '../App';
import { getMakes } from '../services/repository';
import { StyledCard, StyledGrid, StyledInput } from './Styled';

export const Makes = () => {
  const context = React.useContext(VehiclesContext);
  const { data, error, isFetching } = useQuery('makes', getMakes);
  const [filteredData, setFilteredData] = React.useState(data);
  const [filterValue, setfilterValue] = React.useState('');

  const onSelect = (make) => () => {
    context.setState(s => ({
      ...s,
      make
    }))
  }

  React.useEffect(() => {
    const f = filterValue ? data.filter(d => {
      return d.toLowerCase().includes(filterValue.toLowerCase())
    }) : data
    setFilteredData(f)
  }, [filterValue, data])

  const filterMakes = (evt) => {
    setfilterValue(evt.target.value)
  }

  if (isFetching) return 'loading...';
  if (error) {
    return <div>
      <h2>error geting makes</h2>
      <button onClick={() => queryClient.refetchQueries(['makes'])}>Refetch</button>
    </div>;
  }

  return <>
    <StyledInput
      type="text"
      onChange={filterMakes}
      value={filterValue}
      placeholder="Filter brands"
    />
    {!!data.length && <StyledGrid>
      {filteredData && filteredData.map(m => (
        <StyledCard key={m} onClick={onSelect(m)}>{m}</StyledCard>
      ))}
    </StyledGrid>}
  </>
}
