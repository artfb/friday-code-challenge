import React, { useState } from 'react'
import { queryClient, VehiclesContext } from '../App';
import { useVehiclesDetails } from '../hooks/useVehicles';
import { StyledBackButton, StyledCard, StyledFilters, StyledFiltersLayout, StyledGrid, StyledLayout, StyledVehicleDetails, StyledVehicles, StyledVehiclesPagination } from './Styled';

const rowsPerPage = 10;

export const Vehicles = () => {
  const { state: { make, model }, setState } = React.useContext(VehiclesContext)
  const { data, isFetching, error } = useVehiclesDetails(make, model);
  const [filteredDetails, setFilteredDetails] = useState([])
  const [currentFilters, setCurrentFilters] = useState({
    bodyType: '',
    fuelType: '',
    engineCapacity: 0
  })
  const goBack = () => {
    setState(s => ({
      ...s,
      model: ''
    }))
  }

  const onFilterChange = (name) => (evt) => {
    setCurrentFilters(s => ({
      ...s,
      [name]: evt.target.value
    }))
    setPage(0)
  }

  const { bodyType, fuelType, engineCapacity } = currentFilters;

  React.useEffect(() => {
    if (!!data) {
      const f = data.filter(d => {
        return (!!bodyType ? d.bodyType === bodyType : true)
          && (!!fuelType ? d.fuelType === fuelType : true)
        && (d.engineCapacity >= engineCapacity)
      })
      setFilteredDetails(f)
    }
  }, [bodyType, fuelType, engineCapacity, data])

  const filters = data ? data.reduce((acc, cur) => {
      return {
        ...acc,
        bodyType: [
          ...acc.bodyType,
          ...(acc.bodyType.includes(cur.bodyType) ? [] : [cur.bodyType])
        ],
        fuelType: [
          ...acc.fuelType,
          ...(acc.fuelType.includes(cur.fuelType) ? [] : [cur.fuelType])
        ],
        engineCapacity: {
          min: acc.engineCapacity.min ? Math.min(acc.engineCapacity.min, cur.engineCapacity) : cur.engineCapacity,
          max: acc.engineCapacity.max ? Math.max(acc.engineCapacity.max, cur.engineCapacity) : cur.engineCapacity
        }
      }
    }, {
      bodyType: [],
      fuelType: [],
      engineCapacity: { min: null, max: null }
  }) : {
    bodyType: [],
    fuelType: [],
    engineCapacity: { min: null, max: null }
  }

  React.useEffect(() => {
    setCurrentFilters(s => ({
      ...s,
      engineCapacity: filters.engineCapacity.min
    }))
  }, [filters.engineCapacity.min])

  const [page, setPage] = React.useState(0);

  const handleChangePage = (newPage) => {
    setPage(p => p + newPage);
  };

  const rows = filteredDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <StyledLayout>
      <div>
        <StyledBackButton onClick={goBack}>Back</StyledBackButton>
      </div>
      <h3>
        {make} -> {model}
      </h3>
      {error && <button onClick={() => queryClient.refetchQueries(['vehicles', make, model])}>refetch</button>}

      {isFetching ? 'loading...' : <StyledFiltersLayout>
        {!rows.length && 'No entries, sorry!'}
        {!!rows.length && <>
          <StyledFilters>
            <label>
              <h4>Body type</h4>
              <select onChange={onFilterChange('bodyType')} value={currentFilters.bodyType}>
                <option value=''>choose body type</option>
                {filters.bodyType.map(o => <option>{o}</option>)}

              </select>
            </label>
            <label>
              <h4>Fuel type</h4>
              <select onChange={onFilterChange('fuelType')} value={currentFilters.fuelType}>
                <option value=''>choose fuel type</option>
                {filters.fuelType.map(o => <option>{o}</option>)}

              </select>
            </label>
            <div>
              <h4>Engine capacity: {currentFilters.engineCapacity}</h4>
              {filters.engineCapacity.min}
              <input
                value={currentFilters.engineCapacity}
                type="range"
                min={filters.engineCapacity.min}
                max={filters.engineCapacity.max}
                onChange={onFilterChange('engineCapacity')}
              />
              {filters.engineCapacity.max}
            </div>
          </StyledFilters>
          <StyledVehicles>
            <StyledVehiclesPagination>
              <div>
                showing {page * rowsPerPage} - {page * rowsPerPage + rowsPerPage} of {filteredDetails.length} records
              </div>
              <div>
                <button disabled={page===0} onClick={() => handleChangePage(-1)}>prev</button>
                <button disabled={page * rowsPerPage + rowsPerPage >= filteredDetails.length} onClick={() => handleChangePage(1)}>next</button>
              </div>
            </StyledVehiclesPagination>
            <StyledGrid single>
              {rows.map(d => (
                <StyledCard>
                  <StyledVehicleDetails>
                    <div><strong>Engine capacity:</strong> {d.engineCapacity}</div>
                    <div><strong>Body type:</strong> {d.bodyType}</div>
                    <div><strong>Fuel type:</strong> {d.fuelType}</div>
                    <div><strong>Power:</strong> {d.enginePowerPS}PS ({d.enginePowerKW}KW)</div>
                  </StyledVehicleDetails>
                </StyledCard>
              ))}
            </StyledGrid>
            <StyledVehiclesPagination>
              <div>
                <button disabled={page === 0} onClick={() => handleChangePage(-1)}>prev</button>
                <button disabled={page * rowsPerPage + rowsPerPage >= filteredDetails.length} onClick={() => handleChangePage(1)}>next</button>
              </div>
            </StyledVehiclesPagination>
          </StyledVehicles>
        </>}
      </StyledFiltersLayout>}
    </StyledLayout>
  )
}
