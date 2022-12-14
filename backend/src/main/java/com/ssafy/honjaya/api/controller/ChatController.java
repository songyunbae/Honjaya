package com.ssafy.honjaya.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.honjaya.api.request.ChatAskReq;
import com.ssafy.honjaya.api.response.BooleanRes;
import com.ssafy.honjaya.api.response.ChatroomListRes;
import com.ssafy.honjaya.api.response.ChatroomRes;
import com.ssafy.honjaya.api.response.CommonRes;
import com.ssafy.honjaya.api.service.ChatService;
import com.ssafy.honjaya.api.service.JwtServiceImpl;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "채팅 API", tags = {"ChatController"})
@RestController
@RequestMapping("/chats")
public class ChatController {
	private static final Logger logger = LoggerFactory.getLogger(ChatController.class);
	
	@Autowired
	private JwtServiceImpl jwtService;

	@Autowired
	private ChatService chatService;
	
	@ApiOperation(value = "이미 채팅이 있는 사람 또는 이미 채팅을 신청한 사람 (중복이면 'trueOrFalse'가 true, 신청 가능하면 false)", response = BooleanRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping("/ask/{chatAskTo}")
	public ResponseEntity<BooleanRes> alreadyAskedChat(@PathVariable int chatAskTo, HttpServletRequest request) {
		BooleanRes res = new BooleanRes();
		HttpStatus status;
		
		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				int chatAskFrom = jwtService.extractUserNo(accessToken);
				ChatAskReq chatAskReq = new ChatAskReq(chatAskFrom, chatAskTo);
				
				res.setTrueOrFalse(chatService.alreadyAskedChat(chatAskReq)); // 이미 신청했거나 채팅이 있으면 true, 아니면 false
				
				res.setSuccess(true);
				status = HttpStatus.OK;
			} else {
				logger.error("사용 불가능 토큰!!!");
				res.setError("The token is denied");
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			res.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<BooleanRes>(res, status);
	}
	
	@ApiOperation(value = "채팅 신청 (방이 만들어졌으면 'trueOrFalse'가 true, 아니면 false)", response = BooleanRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@PostMapping("/ask/{chatAskTo}")
	public ResponseEntity<BooleanRes> createAsk(@PathVariable int chatAskTo, HttpServletRequest request) {
		BooleanRes res = new BooleanRes();
		HttpStatus status;
		
		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				int chatAskFrom = jwtService.extractUserNo(accessToken);
				ChatAskReq chatAskReq = new ChatAskReq(chatAskFrom, chatAskTo);
				
				res.setTrueOrFalse(chatService.askChat(chatAskReq)); // 방이 만들어졌으면 true, 아니면 false
				
				res.setSuccess(true);
				status = HttpStatus.OK;
			} else {
				logger.error("사용 불가능 토큰!!!");
				res.setError("The token is denied");
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			res.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<BooleanRes>(res, status);
	}
	
	@ApiOperation(value = "본인에게 온 채팅 신청 삭제 (미팅 나가기 버튼 누를 때)", response = CommonRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@DeleteMapping("/ask")
	public ResponseEntity<CommonRes> deleteAsk(HttpServletRequest request) {
		CommonRes res = new CommonRes();
		HttpStatus status;
		
		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				int userNo = jwtService.extractUserNo(accessToken);
				chatService.deleteAsk(userNo);
				res.setSuccess(true);
				status = HttpStatus.OK;
			} else {
				logger.error("사용 불가능 토큰!!!");
				res.setError("The token is denied");
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			res.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<CommonRes>(res, status);
	}

	@ApiOperation(value = "채팅방 목록 조회", response = ChatroomListRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping("/list")
	public ResponseEntity<ChatroomListRes> listChatroom(HttpServletRequest request) {
		ChatroomListRes chatroomListRes = new ChatroomListRes();
		HttpStatus status;
		
		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				int userNo = jwtService.extractUserNo(accessToken);
				chatroomListRes = chatService.listChatroom(userNo);
				chatroomListRes.setSuccess(true);
				status = HttpStatus.OK;
			} else {
				logger.error("사용 불가능 토큰!!!");
				chatroomListRes.setError("The token is denied");
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			chatroomListRes.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<ChatroomListRes>(chatroomListRes, status);
	}
	
	@ApiOperation(value = "채팅방 상세", response = ChatroomRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping("/chatroom/{chatroomNo}")
	public ResponseEntity<ChatroomRes> findChatroom(@PathVariable long chatroomNo, HttpServletRequest request) {
		ChatroomRes chatroomRes = new ChatroomRes();
		HttpStatus status;
		
		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				int userNo = jwtService.extractUserNo(accessToken);
				chatroomRes = chatService.findChatroom(chatroomNo, userNo);
				chatroomRes.setSuccess(true);
				status = HttpStatus.OK;
			} else {
				logger.error("사용 불가능 토큰!!!");
				chatroomRes.setError("The token is denied");
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			chatroomRes.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<ChatroomRes>(chatroomRes, status);
	}
	
	@ApiOperation(value = "채팅방 삭제", response = CommonRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@DeleteMapping("/exit/{chatroomNo}")
	public ResponseEntity<CommonRes> deleteChatroom(@PathVariable long chatroomNo, HttpServletRequest request) {
		CommonRes res = new CommonRes();
		HttpStatus status;
		
		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				chatService.deleteChatroom(chatroomNo);
				res.setSuccess(true);
				status = HttpStatus.OK;
			} else {
				logger.error("사용 불가능 토큰!!!");
				res.setError("The token is denied");
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			res.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<CommonRes>(res, status);
	}
}
