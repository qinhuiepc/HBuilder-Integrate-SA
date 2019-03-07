package com.epc.uhf;

import android.content.Context;
import com.speedata.libuhf.IUHFService;
import com.speedata.libuhf.UHFManager;
import com.speedata.libuhf.bean.SpdInventoryData;
import com.speedata.libuhf.bean.SpdReadData;
import com.speedata.libuhf.bean.SpdWriteData;
import com.speedata.libuhf.interfaces.OnSpdInventoryListener;
import com.speedata.libuhf.interfaces.OnSpdReadListener;
import com.speedata.libuhf.interfaces.OnSpdWriteListener;
import com.scandecode.inf.ScanInterface;
import com.scandecode.ScanDecode;
public class UHFService {

    private IUHFService iuhfService;
    private ScanInterface scanDecode;
    public Object getService(Context context) {

        UHFManager.setStipulationLevel(0);
        try {
            iuhfService = UHFManager.getUHFService(context);
            scanDecode = new ScanDecode(context);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return iuhfService;
    }

    public int selectCard(String epcstr) {
        try {
            int flag = iuhfService.selectCard(1, epcstr, true);
            return flag;
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    public int openDev() {
        return iuhfService.openDev();
    }

    public SpdInventoryData spdData;


    public String getEpc() {
        this.openDev();
        iuhfService.setOnInventoryListener(new OnSpdInventoryListener() {
            @Override
            public void getInventoryData(SpdInventoryData var1) {
                System.out.print("-------------");
                spdData = var1;
            }
        });
        int flag = iuhfService.selectCard(1, spdData.getEpc(), true);
        iuhfService.closeDev();
        return spdData.getEpc();
    }

    //SpdReadData
    // type: 0=int status 读取状态，成功与否
    // 1= byte[] EPCData 目标卡片EPC
    // 2=byte[] ReadData 读到的数据
    // 3=int EPCLen EPC长度
    // 4=int DataLen 读到的数据长度
    // 5=int RSS 信号强度
    Object[] val = new Object[3];
    int pram;
    int datejzf;

    public Object[] getCarData(int type, int jzs) {
        pram = type;
        iuhfService.openDev();
        datejzf = jzs;
        iuhfService.setOnReadListener(new OnSpdReadListener() {
            @Override
            public void getReadData(SpdReadData var1) {
                System.out.print("-------------");
                val[1] = String.valueOf(var1.getStatus());
                switch (pram) {
                    case 1: {
                        byte[] temp = var1.getEPCData();
                        val[2] = temp;
                        break;
                    }
                    case 2:
                        val[2] = UtilTransCode.getString(var1.getReadData(), datejzf);
                        break;
                    case 3:
                        val[2] = String.valueOf(var1.getEPCLen());
                        break;
                    case 4:
                        val[2] = String.valueOf(var1.getDataLen());
                        break;
                    case 5:
                        val[2] = String.valueOf(var1.getRSS());
                        break;
                    default:
                        break;
                }

            }
        });

        int readArea = iuhfService.readArea(PramFixed.area_user, 2, 22, PramFixed.pwd_default);
        val[0] = String.valueOf(readArea);
        System.out.print("====================");
        return val;
    }


    public Object[] WriteCar(String value, int dateType) {
        iuhfService.openDev();
        iuhfService.setOnWriteListener(new OnSpdWriteListener() {
            @Override
            public void getWriteData(SpdWriteData var1) {
                //SpdWriteData
                //int status 写入状态，成功与否
                //byte[] EPCData 目标卡片EPC
                //int EPCLen EPC长度
                //int RSS 信号强度
                System.out.print(var1.getStatus());
            }
        });
        UtilPramCount temp = UtilTransCode.getByte(value, dateType);
        if (temp == null) {
            return new Object[]{"-1"};
        }

        int writeArea = iuhfService.writeArea(PramFixed.area_user, PramFixed.addr_default, temp.getCount(), PramFixed.pwd_default, temp.getContent());
        if (writeArea != 0) {
            //参数错误
        }
        iuhfService.closeDev();
        return new Object[]{writeArea};
    }


    public void wait(int s) {
        try {
            Thread.sleep(s * 1000);
        } catch (Exception e) {
        }
    }
    public int scancount=0;
    public String scanOne(){

        scanDecode.initService("true");
        scanDecode.starScan();
        scanDecode.getBarCode(new ScanInterface.OnScanListener() {
            @Override
            public void getBarcode(String data) {
                scancount =1;
            }
            @Override
            public void getBarcodeByte(byte[] bytes) {
                //返回原始解码数据
                int i = bytes.length;

            }});

        return scancount+"";
    }


}
