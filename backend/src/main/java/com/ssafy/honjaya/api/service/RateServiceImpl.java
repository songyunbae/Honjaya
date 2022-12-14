package com.ssafy.honjaya.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.honjaya.api.request.RateReq;
import com.ssafy.honjaya.api.response.RateRes;
import com.ssafy.honjaya.db.entity.Rate;
import com.ssafy.honjaya.db.repository.RateRepository;
import com.ssafy.honjaya.db.repository.UserRepository;

@Service
public class RateServiceImpl implements RateService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RateRepository rateRepository;

	@Override
	public double getAverageRate(int userNo) {
		Double averageRate = rateRepository.getAverageRate(userNo);
		return averageRate != null ? averageRate : 0.0;
	}

	@Override
	public RateRes findRate(int rateFrom, int rateTo) {
		Rate rate = rateRepository.findByRateFrom_UserNoAndRateTo_UserNo(rateFrom, rateTo);
		if (rate == null) {
			return new RateRes(0, rateFrom, rateTo, 0.0, true, null);
		}
		return new RateRes(rate);
	}

	@Override
	public RateRes insertRate(RateReq rateReq) {
		Rate rate = Rate.builder()
				.rateFrom(userRepository.getOne(rateReq.getRateFrom()))
				.rateTo(userRepository.getOne(rateReq.getRateTo()))
				.rateScore(rateReq.getRateScore())
				.build();
		rate = rateRepository.save(rate);
		return new RateRes(rate);
	}

	@Override
	public RateRes updateRate(int rateNo, RateReq rateReq) {
		Rate rate = rateRepository.findById(rateNo).get();
		rate.setRateScore(rateReq.getRateScore());
		rate = rateRepository.save(rate);
		return new RateRes(rate);
	}

	@Override
	public void deleteRate(int rateNo) {
		rateRepository.deleteById(rateNo);
	}

}
