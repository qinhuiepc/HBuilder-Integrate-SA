package com.epc.uhf;

public class UtilPramCount {

//    数据
    private byte[] content;
    private String contentStr;
//数据长度
    private int count;
//读或写
    private String dhx;

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getDhx() {
        return dhx;
    }

    public void setDhx(String dhx) {
        this.dhx = dhx;
    }
    public String getContentStr() {
        return contentStr;
    }

    public void setContentStr(String contentStr) {
        this.contentStr = contentStr;
    }

}
