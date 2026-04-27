/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GetStarted from './pages/GetStarted';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#fafafa] font-sans">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/get-started" element={<GetStarted />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
