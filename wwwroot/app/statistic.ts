//Thêm cho hiển thị bảng dữ liệu
import FeatureLayer from "esri/layers/FeatureLayer";
import * as init from "./init_variables";
import { MovingChartModel } from './models/MovingChartModel';
//import axios from "axios";

export default function getCORSLayers(id_layerShow: number) {
    const myFeatureLayer = new FeatureLayer({
        url: init.map_feature + "/" + id_layerShow,
        title: "Bảng chuyển dịch"
    });
    const categorySelect = document.getElementById("categorySelect");
    myFeatureLayer.queryFeatures(null).then(function (response: any) {
        if (response.features.length > 0) {
            response.features.map((feature: any) => {
                // Tạo phần tử option mới
                const option = document.createElement("option");
                option.value = feature.attributes.Tên;          // giá trị option
                option.textContent = `${feature.attributes.Tên} (${feature.attributes.btong},${feature.attributes.ltong})`;  // text hiển thị

                // Thêm vào select
                categorySelect.appendChild(option);
            })
        }
    });
}

export async function GetDataForStatistic(cors_name: string, from_date: string, to_date: string) {
    const apiUrl = "/api/MovingChart";

    const params = new URLSearchParams({
        TenTramCORS: cors_name,
        StartDate: from_date,
        EndDate: to_date
    });

    try {
        const response = await fetch(`${apiUrl}?${params.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        //console.log(data); // đây là mảng trả về từ API
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}