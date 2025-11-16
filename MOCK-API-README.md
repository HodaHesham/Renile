# Mock API Implementation Guide

## Overview

This implementation provides a comprehensive mock API system for the Renile Aquaculture Management Application. The system allows you to switch between mock data and real API endpoints seamlessly.

## Features

### 🎯 **Mock Data Available**
- **Farms**: Farm management data with details like location, pond count, fish count, contact info
- **Ponds**: Individual pond information including fish type, water quality, temperature
- **Feed Rate**: Feeding schedules, amounts, and efficiency data (table and chart views)
- **Growth Rate**: Fish growth tracking, weight measurements, growth percentages
- **Toxic Ammonia**: Water quality monitoring, ammonia levels, safety thresholds (table and chart views)
- **Death Rate**: Mortality tracking and analysis by pond

### ⚙️ **API Toggle System**
- **Easy Switch**: Toggle between mock and real APIs using the checkbox in the top navigation
- **Real-time Notifications**: Toast messages confirm when switching between modes
- **Persistent State**: The application remembers your preference during the session
- **Development Friendly**: Perfect for development when backend APIs are unavailable

### 📊 **Realistic Mock Data**
- **Comprehensive Datasets**: Each endpoint has realistic, comprehensive data
- **Proper Structure**: Data follows the same structure as real API responses
- **Varied Scenarios**: Includes different pond types, fish species, and varying conditions
- **Time-based Data**: Historical data with proper date/time stamps

## Usage

### 1. **API Mode Toggle**
In the top navigation bar, you'll find an "Use Mock Data" checkbox:
- ✅ **Checked**: All API calls use static mock data
- ❌ **Unchecked**: API calls attempt to reach real backend endpoints

### 2. **Accessing Different Modules**
Navigate through the application normally:
- **Dashboard**: Overview with charts and summaries
- **Feed Rate**: Feeding management and analytics
- **Ponds**: Pond monitoring and death rate analysis
- **Growth Rate**: Fish growth tracking
- **Toxic Ammonia**: Water quality monitoring

### 3. **Mock Data Files Location**
All mock data is stored in: `src/assets/demo/data/`
- `farms.json` - Farm information
- `ponds.json` - Pond details
- `feed-rate-table.json` - Feeding data table
- `feed-rate-chart.json` - Feeding analytics chart
- `growth-rate.json` - Growth tracking data
- `toxic-ammonia-table.json` - Water quality table
- `toxic-ammonia-chart.json` - Water quality charts
- `death-rate.json` - Mortality tracking data

## Technical Implementation

### Mock Service Architecture

#### `MockApiService`
Central service that:
- Manages mock/real API mode toggle
- Provides mock data with simulated network delay
- Handles CRUD operations for farms
- Provides prediction simulation for toxic ammonia

#### Updated Services
All existing services have been enhanced:
- `FarmsService` - Farm management with mock support
- `PondService` - Pond data with mock fallback
- `FeedService` - Feed rate data (table and charts)
- `GrowthService` - Growth tracking mock data
- `ToxicService` - Water quality and prediction mocking

#### API Toggle Component
User-friendly toggle component that:
- Displays current API mode
- Allows real-time switching
- Shows notifications
- Persists user preference

### Code Example

```typescript
// Using mock data in any service
constructor(
    private http: HttpClient,
    private mockApiService: MockApiService
) {}

getData(): Observable<any> {
    if (this.mockApiService.isMockMode()) {
        return this.mockApiService.getFarms();
    }
    return this.http.get<any>(this.realApiUrl);
}
```

## Data Structure Examples

### Farm Data
```json
{
    "createdAt": "2024-01-15T10:00:00Z",
    "id": "farm-001",
    "name": "AquaTech Farm",
    "type": "Intensive Fish Farming",
    "nPonds": 12,
    "nFishPerPond": 5000,
    "contactEmail": "info@aquatechfarm.com"
}
```

### Pond Data
```json
{
    "id": "pond-001",
    "name": "Pond Alpha-1",
    "numberOfFish": 4850,
    "typeOfFish": "Atlantic Salmon",
    "averageWeight": 2.3,
    "temperature": 18.5,
    "waterQuality": "Excellent"
}
```

### Feed Rate Data
```json
{
    "date": "2024-02-14",
    "pond_name": "Pond Alpha-1",
    "feed_amount_kg": 45.2,
    "feeding_efficiency": 0.92,
    "water_temperature": 18.5
}
```

## Development Benefits

### ✅ **Advantages**
- **No Backend Dependency**: Develop frontend independently
- **Predictable Data**: Consistent test data for development
- **Network Simulation**: Realistic API delays for testing
- **Easy Testing**: Test different scenarios with static data
- **Rapid Prototyping**: Quick feature development and testing

### 🔄 **Easy Transition**
- **Seamless Switch**: Toggle between mock and real APIs instantly
- **Same Interface**: No code changes required in components
- **Production Ready**: Simply disable mock mode for production deployment
- **Gradual Migration**: Migrate endpoint by endpoint as backend becomes available

## Production Deployment

For production deployment:
1. Set `useMockData = false` in `MockApiService`
2. Or remove the mock toggle and always use real APIs
3. Ensure all real API endpoints are properly configured
4. Test all endpoints before deployment

## Extending Mock Data

To add new mock endpoints:
1. Create JSON file in `src/assets/demo/data/`
2. Add method to `MockApiService`
3. Update corresponding service to use mock data
4. Test with real application flow

This mock implementation provides a robust foundation for development and testing of the aquaculture management application!