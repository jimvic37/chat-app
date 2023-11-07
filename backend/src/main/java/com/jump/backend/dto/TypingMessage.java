package com.jump.backend.dto;

public class TypingMessage {
    private String content;
    private String typer; 	
    private String typerName;
    private String chatId;
    
    public TypingMessage() {
    }

    public TypingMessage(String content, String typer, String typerName, String chatId) {
		super();
		this.content = content;
		this.typer = typer;
		this.typerName = typerName;
		this.chatId = chatId;
	}


	public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }


	public String getTyper() {
		return typer;
	}

	public void setTyper(String typer) {
		this.typer = typer;
	}

	
	public String getChatId() {
		return chatId;
	}

	public void setChatId(String chatId) {
		this.chatId = chatId;
	}

	public String getTyperName() {
		return typerName;
	}

	public void setTyperName(String typerName) {
		this.typerName = typerName;
	}
}