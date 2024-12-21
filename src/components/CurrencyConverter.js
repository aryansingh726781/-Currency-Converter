import React, { useState, useEffect } from 'react';
import { fetchExchangeRates } from '../components/services/api';
import {
  Container,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
  CircularProgress,
  IconButton,styled,theme
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';


const HeadingContainer = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    marginBottom: '20px',
    padding: '10px 20px',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  }));
  
  const HeadingText = styled(Typography)(({ theme }) => ({
    fontFamily: '"Roboto", sans-serif',
    fontWeight: '700',
    fontSize: '2rem',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  }));

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(false);


useEffect(() => {
    const loadRates = async () => {
      setLoading(true);
      try {
        const data = await fetchExchangeRates(baseCurrency);
        if (data && data.rates) {
          setRates(data.rates);
          setCurrencies(Object.keys(data.rates));
        } else {
          console.error('Failed to load exchange rates.');
        }
      } catch (error) {
        console.error('Failed to fetch rates:', error);
      } finally {
        setLoading(false);
      }
    };
    loadRates();
  }, [baseCurrency]);
  
 

  const handleConversion = () => {
    if (rates[targetCurrency]) {
      setConvertedAmount((amount * rates[targetCurrency]).toFixed(2));
    }
  };

  const handleSwap = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
    setConvertedAmount(0);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff' }}>
      <HeadingContainer>
  <HeadingText>
    Currency Converter
  </HeadingText>
  <Typography variant="subtitle1" sx={{ color: '#e0e0e0', marginTop: '5px' }}>
    Real-Time Exchange Rates at Your Fingertips
  </Typography>
</HeadingContainer>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <TextField
              type="number"
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
            />
            <Select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              fullWidth
            >
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box textAlign="center" mb={2}>
            <IconButton onClick={handleSwap} color="primary" size="large">
              <SwapHorizIcon fontSize="large" />
            </IconButton>
          </Box>

          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <TextField
              label="Converted Amount"
              value={convertedAmount}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <Select
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
              fullWidth
            >
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleConversion}
            fullWidth
          >
            Convert
          </Button>
        </>
      )}
    </Container>
  );
};

export default CurrencyConverter;
